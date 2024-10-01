"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import Link from "next/link";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

const PasswordReset = (params) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  
  console.log("params", params);

  const token = params.token;

  const [resetPassword, { isLoading, isSuccess, isError, data, error }] = useResetPasswordMutation();

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleChange2 = () => {
    setVisible2(!visible2);
  };

  const handlePasswordReset = async (data) => {

    const passObj ={
      password: data.password,
    };


    console.log({
      token: token,
      data: passObj,
    });


    // await resetPassword({
    //   token: token,
    //   data: passObj,
    // });

    // console.log("salim-data", passObj);

    // You can add your logic here to handle the password reset, e.g., API call
  };

  return (
    <div
      className="p-2 h-screen flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #6767fd, #6e6bfc, #756ffc, #7b73fb, #8177fa, #8b80fa, #9489fb, #9d92fb, #aca2fc, #bbb1fe, #c9c1fe, #d7d1ff);",
      }}
    >
      <section className="flex justify-center items-center h-screen bg-white">
        <form onSubmit={handleSubmit(handlePasswordReset)} className="max-w-[700px] w-full">
          <h1 className="font-medium text-4xl font-serif mb-10">Change Your Password</h1>
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
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                    New password
                  </label>
                  <InputGroup size="lg" inside>
                    <Input {...field} type={visible ? "text" : "password"} />
                    <InputGroup.Button onClick={handleChange}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
                  </InputGroup>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
              )}
            />
          </div>
          {/* confirm password */}
          <div>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password is required",
                validate: (value) => value === watch('password') || "Confirm Password must match",
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper mt-4">
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm your new password
                  </label>
                  <InputGroup size="lg" inside>
                    <Input {...field} type={visible2 ? "text" : "password"} />
                    <InputGroup.Button onClick={handleChange2}>{visible2 ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
                  </InputGroup>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              )}
            />
          </div>
          <button type="submit" className="py-3 px-5 bg-primary text-white rounded-md mt-5">
            Change your password
          </button>
          <Link href="/login" className="text-blue-800 hover:underline font-medium mt-5 block">
            Back to log in
          </Link>
        </form>
      </section>
    </div>
  );
};

export default PasswordReset;
