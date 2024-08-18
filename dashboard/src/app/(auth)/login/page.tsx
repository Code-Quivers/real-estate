"use client";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
const LogIn = () => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 6
          ? null
          : "Password should contain at least 6 characters",
    },
  });

  const handleLogin = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <section>
        <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 md:max-w-[700px]">
          <div className="">
            <div className="p-2 border bg-gray-50 rounded-3xl">
              <div className="p-10 bg-white border shadow-lg rounded-2xl">
                <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
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
        </div>
      </section>
    </div>
  );
};

export default LogIn;
