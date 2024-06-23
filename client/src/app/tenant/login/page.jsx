"use client";

import tenantLoginImage from "@/assets/loginPage/Login- Tenant.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import { Button, Form, Input, InputGroup, toaster } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { getUserInfo, isLoggedIn, storeUserInfo } from "@/hooks/services/auth.service";
import { LoginErrorMessage, LoginSuccessMessage } from "@/components/toasts/auth/authToastMessages";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [loginUser, { isLoading, error, isSuccess, isError, data }] = useLoginUserMutation();
  const router = useRouter();
  const isAlreadyLoggedIn = isLoggedIn();
  const userDetails = getUserInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTenantLogin = async (user) => {
    const userLoginData = {
      emailOrUsername: user?.emailOrUsername,
      password: user?.password,
      requestedRole: "TENANT",
    };
    const res = await loginUser({ data: userLoginData }).unwrap();
    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  useEffect(() => {
    if (isAlreadyLoggedIn && userDetails?.role === "TENANT") {
      router.push("/tenant");
    }
  }, [isAlreadyLoggedIn, userDetails, router]);
  //
  useEffect(() => {
    //
    if ((isSuccess && !isLoading && !isError, !error && data)) {
      router.push("/tenant");
      toaster.push(LoginSuccessMessage(data?.message), {
        placement: "bottomStart",
      });
    }

    // if error
    if ((!isSuccess && !isLoading && isError, error && !data)) {
      toaster.push(LoginErrorMessage(error?.message), {
        placement: "bottomStart",
      });
    }
  }, [isSuccess, isLoading, isError, error, data]);

  return (
    <div className=" max-md:flex max-md:flex-col max-md:justify-center md:grid grid-cols-2 overflow-hidden items-center flex-col md:flex-row h-screen">
      <div className="col-span-1 bg-[#29429f] w-full max-lg:hidden flex justify-center items-center h-screen sticky top-0">
        <Image className="object-contain" width={1000} height={1000} src={tenantLoginImage} alt="Tenant Login Image" />
      </div>
      <div className="w-full  col-span-1  ">
        <div className="flex justify-center">
          <h2 className="text-6xl md:mt-0 mt-5 mb-10 font-bold">Sign In</h2>
        </div>

        <div className="w-[90%] lg:w-[80%] mx-auto">
          <form onSubmit={handleSubmit(handleTenantLogin)}>
            <div className="space-y-5">
              <div>
                <Controller
                  name="emailOrUsername"
                  control={control}
                  rules={{
                    required: "Username Or Email is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input autoComplete="off" {...field} type="text" placeholder="Username or Email" />
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.emailOrUsername && !!errors?.emailOrUsername?.message) || false} placement="topEnd">
                        {errors?.emailOrUsername?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* password */}
              <div>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is Required",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{6,}$/,
                      message:
                        "Password should include at least 1 lowercase & uppercase letter, 1 special character (e.g., @, #, $), and be at least 6 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <FaLock size={20} />
                        </InputGroup.Addon>
                        <Input {...field} type={visible ? "text" : "password"} placeholder="Password" />
                        <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
                        <Form.ErrorMessage show={(!!errors?.password && errors?.password?.type === "required") || false} placement="topEnd">
                          {errors?.password?.message}
                        </Form.ErrorMessage>
                      </InputGroup>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* password requirement */}
            <div className="h-16 text-xs font-medium text-white mt-2">
              {errors?.password?.type === "pattern" && <p className="text-red-500  rounded-md">{errors?.password?.message}</p>}
            </div>
            <div className="flex justify-center">
              <Button loading={isLoading} type="submit" size="lg" className="!rounded-md w-full !px-8 !py-3" appearance="default">
                Sign In
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-5 flex justify-center">
          <p className="font-semibold">
            Need an Account?{" "}
            <Link className="text-blue-800 hover:underline" href="/tenant/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
