"use client";

import tenantLoginImage from "@/assets/loginPage/property_owner_login.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import { Form, Input, InputGroup, Loader, toaster } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import {
  //  getUserInfo, isLoggedIn,
  storeUserInfo,
} from "@/hooks/services/auth.service";
import { LoginErrorMessage, LoginSuccessMessage } from "@/components/toasts/auth/authToastMessages";

const PropertyOwnerLoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [loginUser, { isLoading, error, isSuccess, isError, data }] = useLoginUserMutation();
  const router = useRouter();
  // const isAlreadyLoggedIn = isLoggedIn();
  // const userDetails = getUserInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // ! submit to login
  const handlePropertyOwnerLogin = async (user) => {
    const userLoginData = {
      emailOrUsername: user?.emailOrUsername,
      password: user?.password,
      requestedRole: "PROPERTY_OWNER",
    };
    const res = await loginUser({ data: userLoginData }).unwrap();
    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  //
  // useEffect(() => {
  //   if (isAlreadyLoggedIn && userDetails?.role === "PROPERTY_OWNER") {
  //     router.push("/property-owner");
  //   }
  // }, [isAlreadyLoggedIn, userDetails, router]);

  //  for api
  useEffect(() => {
    //
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
  }, [isSuccess, isLoading, isError, error, data]);

  return (
    <div className=" max-md:flex max-md:flex-col max-md:justify-center md:grid grid-cols-2 overflow-hidden items-center flex-col md:flex-row h-screen">
      <div className=" bg-[#29429f] w-full max-lg:hidden flex justify-center items-center     h-screen sticky top-0">
        <Image className="object-contain" src={tenantLoginImage} alt="Property Owner Login Image" />
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
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{6,}$/,
                      message:
                        "Password should include at least 1 lowercase & uppercase letter, 1 special character (e.g., @, #, $), and be at least 6 characters long",
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
                      <Form.ErrorMessage show={(!!errors?.password && errors?.password?.type === "required") || false} placement="topEnd">
                        {errors?.password?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* password requirement */}

              <div className="h-16 text-xs font-medium text-white">
                {errors?.password?.type === "pattern" && <p className="text-red-500">{errors?.password?.message}</p>}
              </div>
            </div>
            <div className="mb-4 text-right">
              <Link href="/forgot-password" className="text-blue-800 hover:underline font-medium">
                Forgot your password?
              </Link>
            </div>
            <div className=" flex justify-center">
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
