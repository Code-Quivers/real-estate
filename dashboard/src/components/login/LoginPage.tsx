"use client";
import { storeUserInfo } from "@/hooks/services/auth.service";
import { useDashboardLoginMutation } from "@/redux/api/features/auth/authApi";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import classes from "./Notification.module.css";

const LoginPage = () => {
  const router = useRouter();
  const [dashboardLogin, { data, isLoading, isSuccess, isError, error }] =
    useDashboardLoginMutation();
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 5
          ? null
          : "Password should contain at least 5 characters",
    },
  });
  // ! handle submit
  const handleDashboardLogin = async (values: any) => {
    console.log("values", values);
    const loginData = {
      email: values?.email,
      password: values?.password,
    };
    const res = await dashboardLogin({ data: loginData }).unwrap();
    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  // ! side effect
  useEffect(() => {
    //
    if (isSuccess && !isLoading && !isError && !error && data) {
      router.push("/");
      notifications.show({
        title: "Success",
        color: "green",
        message: `${
          // @ts-ignore
          data?.message || "Login Success"
        }`,
        classNames: classes,
      });
    }

    // if error
    if (!isSuccess && !isLoading && isError && error && !data) {
      notifications.show({
        color: "red",
        title: "Error",
        message: `${
          // @ts-ignore
          error?.message || "Failed to Login"
        }`,
        classNames: classes,
      });
    }
  }, [isSuccess, isLoading, isError, error, data, router]);

  return (
    <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 md:max-w-[700px]">
      <div className="p-5 border bg-gray-50 rounded-3xl">
        <div className="p-10 bg-white border shadow-lg rounded-2xl">
          <form
            onSubmit={form.onSubmit((values) => handleDashboardLogin(values))}
          >
            <div className="space-y-3">
              <TextInput
                // type="email"
                label="Email"
                placeholder="Input placeholder"
                size="lg"
                radius="md"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Password"
                placeholder="Input placeholder"
                size="lg"
                radius="md"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <div>
                <Button
                  loading={isLoading}
                  type="submit"
                  className="hover:bg-gray-700"
                  fullWidth
                  size="lg"
                  radius="md"
                  color="#111827"
                >
                  Sign in
                </Button>
                {/* <button
                        className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        type="submit"
                      >
                        Sign in
                      </button> */}
              </div>
            </div>
            {/* <div className="mt-6">
                    <p className="flex mx-auto text-sm font-medium leading-tight text-center text-black">
                      Not have a password?
                      <a
                        className="ml-auto text-blue-500 hover:text-black"
                        href="/forms/signup"
                      >
                        Sign up now
                      </a>
                    </p>
                  </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
