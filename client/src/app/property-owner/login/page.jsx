"use client";

import tenantLoginImage from "@/assets/loginPage/Login- Tenant.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import { Button, Form, Input, InputGroup, Loader, toaster } from "rsuite";
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

const PropertyOwnerLoginPage = () => {
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

  const handlePropertyOwnerLogin = async (user) => {
    const userLoginData = {
      emailOrUsername: user?.emailOrUsername,
      password: user?.password,
    };
    const res = await loginUser({ data: userLoginData }).unwrap();
    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      if (userDetails?.role === "TENANT") router.push("/tenant");
      else if (userDetails?.role === "PROPERTY_OWNER") router.push("/property-owner");
      else if (userDetails?.role === "SERVICE_PROVIDER") router.push("/service-provider");
    }
    if ((isSuccess && !isLoading && !isError, !error && data)) {
      router.push("/property-owner");
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
  }, [isAlreadyLoggedIn, userDetails, isSuccess, isLoading, isError, error, data]);

  return (
    <div className=" max-md:flex max-md:flex-col max-md:justify-center md:grid grid-cols-2 overflow-hidden items-center flex-col md:flex-row h-screen">
      <div className="bg-[#29429f] max-md:hidden  col-span-1 w-full  flex justify-center items-center">
        <Image className="object-cover h-screen" src={tenantLoginImage} alt="Property Owner Login Image" />
      </div>
      <div className="w-full  col-span-1  ">
        <div className="flex justify-center">
          <h2 className="text-6xl md:mt-0 mt-5 mb-10 font-bold">Sign In</h2>
        </div>

        <div className="w-[90%] lg:w-[80%] mx-auto">
          <form onSubmit={handleSubmit(handlePropertyOwnerLogin)}>
            <div className="space-y-6 lg:space-y-3">
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
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required for password",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <FaLock size={20} />
                        </InputGroup.Addon>
                        <Input {...field} type={visible ? "text" : "password"} placeholder="Password" />
                        <InputGroup.Button
                          type="button"
                          onClick={() => {
                            setVisible(!visible);
                          }}
                        >
                          {visible ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.password && !!errors?.password?.message) || false} placement="topEnd">
                        {errors?.password?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              {isLoading ? (
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full py-3 rounded-md disabled:cursor-not-allowed disabled:opacity-70 bg-primary"
                >
                  <Loader size="sm" className="align-middle" />
                </button>
              ) : (
                <button type="submit" className="w-full py-3 rounded-md bg-primary text-white">
                  Sign in
                </button>
              )}

              {/* <Button loading={isLoading} type="submit" size="lg" className="!rounded-md !py-3.5 w-full" appearance="default">
                {isLoading ? "" : "Sign In"}
              </Button> */}
            </div>
          </form>
        </div>

        <div className="mt-2 flex justify-center w-[90%] lg:w-[80%] mx-auto">
          <p className="font-semibold">
            Need an Account?{" "}
            <Link className="text-blue-800 hover:underline" href="/property-owner/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyOwnerLoginPage;
