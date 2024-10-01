"use client";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowLeftLine } from "react-icons/ri";
import { TbMailDown } from "react-icons/tb";
import { toaster } from "rsuite";
import { SignUpSuccessMessage } from "../toasts/auth/authToastMessages";

const PasswordForgot = () => {

  const [forgetPassword, {isLoading, isSuccess,isError, data, error} ] = useForgetPasswordMutation();

  const [toggleContent, setToggleContent] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log(errors);

  const handleForgotPassword = async (data) => {
    console.log("salim-data", data);

    await forgetPassword(data);
  };


  return (
    <div
      className=" h-screen flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #6767fd, #6e6bfc, #756ffc, #7b73fb, #8177fa, #8b80fa, #9489fb, #9d92fb, #aca2fc, #bbb1fe, #c9c1fe, #d7d1ff);",
      }}
    >
      {toggleContent ? (
        <section className="flex justify-center items-center h-screen bg-white m-2">
          {}
          <form className="lg:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] px-5 sm:p-0" onSubmit={handleSubmit(handleForgotPassword)}>
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
          <div className="sm:w-96 border shadow-md rounded-md sm:p-10 px-3 py-5 sm:mx-0 mx-3">
            <TbMailDown size={30} className="text-green-600 text-center w-full mb-8" />
            <h4 className="mb-3 font-semibold text-center">Check Your Email</h4>
            <p className="text-gray-800 text-center">
              If mostafizur@gmail.com exists, you will receive an email there shortly. You may need to check your spam folder.
            </p>
            <hr className="my-5 border-gray-800" />
            <Link href="/login" className="hover:text-blue-700 text-center">
              <RiArrowLeftLine size={24} className="text-blue-600 w-full" />
              <p className="text-sm font-semibold">Back to Log In</p>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default PasswordForgot;
