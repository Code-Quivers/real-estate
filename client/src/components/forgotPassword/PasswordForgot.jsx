"use client";
import { getAuthKey } from "@/configs/envConfig";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { baseApi } from "@/redux/api/baseApi";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowLeftLine } from "react-icons/ri";
import { TbMailDown } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Notification, toaster } from "rsuite";

const PasswordForgot = () => {
  const [forgetPassword, { isLoading, isSuccess, isError, data: resData, error }] = useForgetPasswordMutation();
  const dispatch = useDispatch();

  const [toggleContent, setToggleContent] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgotPassword = async (data) => {
    removeUserInfo(getAuthKey());
    dispatch(baseApi.util.resetApiState());
    await forgetPassword(data);
  };

  // side effect and notification

  useEffect(() => {
    if (!isLoading && !isError && isSuccess && !error) {
      toaster.push(
        <Notification type="success" header="Success" closable>
          {resData?.message || "Success"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 2000,
        },
      );
      setToggleContent(false);
    }

    if (!isLoading && isError && !isSuccess && error) {
      toaster.push(
        <Notification type="error" header="Error" closable>
          {error?.message || "Failed to sent reset link"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 2000,
        },
      );
    }
  }, [isLoading, isError, isSuccess, error]);

  return (
    <div className=" h-screen flex flex-col">
      {toggleContent ? (
        <section className="flex justify-center items-center h-screen bg-white m-2">
          <form className="max-w-5xl  max-md:px-3" onSubmit={handleSubmit(handleForgotPassword)}>
            <h2 className="sm:text-3xl text-2xl font-medium text-primary font-serif">Forgot your password? 😰</h2>
            <h1 className="sm:text-4xl text-2xl font-medium mt-2 font-serif">Don’t worry, we’re here to help</h1>
            <p className="text-gray-600 sm:text-lg text-base mt-8 font-medium">
              Enter the email address you used to create your account. If this email exists, we’ll send you instructions to reset your password.
            </p>
            <div className="mt-10">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                id="email"
                name="email"
                className={`mt-1 block w-full px-3 py-4 border-2 border-gray-300 hover:border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors?.email?.message && "border-red-500 focus:border-red-500 hover:border-red-500"}`}
              />
            </div>
            {/* error */}
            <div>{errors?.email?.message && <p className="text-red-500 text-sm mt-1">{errors?.email?.message}</p>}</div>
            <button type="submit" className={"w-full py-4 mt-10 bg-primary hover:bg-blue-900 rounded-md text-white text-lg font-medium"}>
              Send Me Reset Instructions
            </button>
            <Link href="/login" className="text-center mt-5 block text-blue-600 hover:underline">
              Back to Log In
            </Link>
          </form>
        </section>
      ) : (
        <section className="h-screen m-2 bg-white flex justify-center items-center">
          <div className="max-w-xl border shadow-md rounded-xl sm:p-10 px-3 py-5 sm:mx-0 mx-3">
            <TbMailDown size={40} className="text-green-600 text-center w-full mb-8" />
            <h4 className="mb-5 font-semibold text-center text-3xl">Check Your Email</h4>
            <p className="text-gray-800 font-semibold font-mono text-center">
              {`  If an account associated with this email address exists in our system, a password reset link has been sent. Please check your Email inbox for
              the email and follow the instructions to reset your password. If you don't see the email, be sure to check your spam or junk folder as
              well. If you experience any issues,
              please contact our support team for further assistance.`}
            </p>
            <hr className="my-5 border-gray-800" />
            <Link href="/" className="hover:text-blue-700 text-center hover:underline">
              <RiArrowLeftLine size={24} className="text-blue-600 w-full" />
              <p className="text-sm font-semibold">Back to Home</p>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default PasswordForgot;
