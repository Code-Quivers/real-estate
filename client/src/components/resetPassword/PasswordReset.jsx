"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, InputGroup, Notification, useToaster } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import Link from "next/link";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { FaCheck } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { getAuthKey } from "@/configs/envConfig";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/api/baseApi";
import { useRouter } from "next/navigation";

const PasswordReset = ({ params }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [toggleContent, setToggleContent] = useState(true);
  const dispatch = useDispatch();
  const toaster = useToaster();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading, isSuccess, isError, data: resData, error }] = useResetPasswordMutation();

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleChange2 = () => {
    setVisible2(!visible2);
  };

  const handlePasswordReset = async (data) => {
    removeUserInfo(getAuthKey());
    dispatch(baseApi.util.resetApiState());
    const passObj = {
      password: data.password,
    };

    await resetPassword({
      token: params,
      data: passObj,
    });
  };
  // side effect and notification

  useEffect(() => {
    if (!isLoading && !isError && isSuccess && !error) {
      toaster.push(
        <Notification type="success" header="Success" closable>
          {resData?.message || "Success"}
        </Notification>,
        {
          placement: "topCenter",
          duration: 3000,
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
          placement: "topCenter",
          duration: 5000,
        },
      );
    }
  }, [isLoading, isError, isSuccess, error]);

  //

  const roleRoutes = {
    TENANT: "/tenant/login",
    PROPERTY_OWNER: "/property-owner/login",
    SERVICE_PROVIDER: "/service-provider/login",
  };

  const href = roleRoutes[resData?.data?.userRole] || "/";

  return (
    <div>
      <div className="h-screen flex flex-col max-md:px-3">
        {toggleContent ? (
          <section className="flex justify-center items-center h-screen bg-white">
            <form onSubmit={handleSubmit(handlePasswordReset)} className="max-w-3xl w-full">
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
                    validate: (value) => value === watch("password") || "Confirm Password must match",
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
              <div className="mt-5">
                <Link href="/login" className="text-blue-800 hover:underline font-medium  ">
                  Back to Home
                </Link>
              </div>
            </form>
          </section>
        ) : (
          <section className="h-screen m-2  flex justify-center items-center">
            <div className="max-w-xl bg-green-50/50 border border-green-600  shadow-md rounded-3xl sm:p-10 px-3 py-2 sm:mx-0 mx-3">
              <FaCheck size={30} className="text-green-600 text-center w-full mb-5" />
              <div>
                <h4 className="mb-5 font-semibold text-center text-xl">Password Reset Success</h4>
                <p className="text-gray-800 font-medium font-mono text-center">
                  {` Your password has been successfully reset. You can now log in using your new password.If you have any concerns about your account’s security, please contact our support team immediately`}
                </p>
              </div>
              <hr className="my-5 border-gray-800" />
              <div className="flex justify-center  gap-10">
                <div className="  ">
                  <Link
                    href="/"
                    className="flex  justify-end  items-end gap-3  hover:bg-blue-600 rounded-full px-5 py-1.5 hover:text-white duration-300 transition-all"
                  >
                    <span>
                      <IoHome size={24} className="" />
                    </span>
                    <span>
                      <p className="text-sm font-semibold">Home</p>
                    </span>
                  </Link>
                </div>
                <div className="">
                  <button
                    onClick={() => {
                      router.replace(href);
                    }}
                    href={href}
                    className="flex  justify-end  items-end gap-3  hover:bg-green-600 rounded-full px-5 py-1.5 hover:text-white duration-300 transition-all"
                  >
                    <span>
                      <p className="text-sm font-semibold">Login Now</p>
                    </span>
                    <span>
                      <IoMdLogIn size={24} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
