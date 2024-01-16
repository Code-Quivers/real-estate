"use client";

import serviceProviderLoginImage from "@/assets/loginPage/SignUp- Tenant.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Notification,
  useToaster,
} from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useEffect, useState } from "react";
import Link from "next/link";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import { FaLock } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { useServiceProviderSignUpMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { SignUpSuccessMessage } from "@/components/toasts/auth/authToastMessages";

const style = {
  width: "100%",
  borderRadius: "20px !important",
  overflow: "hidden !important",
};

const ServiceProviderSignUpPage = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [
    serviceProviderSignUp,
    { isLoading, error, isSuccess, isError, data },
  ] = useServiceProviderSignUpMutation();

  const router = useRouter();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleServiceProviderSignUp = async (user) => {
    const serviceProviderData = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userName: user?.userName,
      email: user?.email,
      password: user?.password,
    };
    await serviceProviderSignUp({ data: serviceProviderData }).unwrap();
  };

  useEffect(() => {
    if ((isSuccess && !isLoading && !isError, !error && data)) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">
              Congratulations! You have successfully signed up as a Service
              Provider.
            </p>
            <hr className="border-t border-gray-300 my-4" />
            <p>Your account is now ready to use.</p>
          </div>
        </Notification>,
        { placement: "bottomStart" },
      );
      router.push("/service-provider/login");
    }
  }, [isSuccess, isLoading, isError, error, data]);

  return (
    <div className="grid grid-cols-1 max-lg:mt-10 lg:grid-cols-2">
      <div className="col-span-1 flex flex-col items-center justify-center ">
        <div>
          <h2 className="text-5xl md:mt-0 mt-5 mb-10 font-semibold">Sign Up</h2>
        </div>
        {/* input forms */}
        <div className="w-full max-lg:px-5 lg:w-3/4 mx-auto ">
          <form onSubmit={handleSubmit(handleServiceProviderSignUp)}>
            <div className="space-y-6 lg:space-y-3">
              {/* first Name */}
              <div>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "First Name is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" style={style} inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input
                          {...field}
                          type="text"
                          placeholder="First Name"
                        />
                      </InputGroup>
                      <Form.ErrorMessage
                        show={
                          (!!errors?.firstName &&
                            !!errors?.firstName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.firstName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* last Name */}
              <div>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: "Last Name is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" style={style} inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="Last Name" />
                      </InputGroup>
                      <Form.ErrorMessage
                        show={
                          (!!errors?.lastName && !!errors?.lastName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.lastName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* user Name */}{" "}
              <div>
                <Controller
                  name="userName"
                  control={control}
                  rules={{
                    required: "Username is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" style={style} inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="Username" />
                      </InputGroup>
                      <Form.ErrorMessage
                        show={
                          (!!errors?.userName && !!errors?.userName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.userName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* email */}
              <div>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Please provide your valid email",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" style={style} inside>
                        <InputGroup.Addon>
                          <EmailFillIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="Email" />
                      </InputGroup>
                      <Form.ErrorMessage
                        show={
                          (!!errors?.email && !!errors?.email?.message) || false
                        }
                        placement="topEnd"
                      >
                        {errors?.email?.message}
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
                      <InputGroup size="lg" style={style} inside>
                        <InputGroup.Addon>
                          <FaLock />
                        </InputGroup.Addon>
                        <Input
                          {...field}
                          type={visible ? "text" : "password"}
                          placeholder="Password"
                        />
                        <InputGroup.Button
                          onClick={() => {
                            setVisible(!visible);
                          }}
                        >
                          {visible ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                      </InputGroup>
                      <Form.ErrorMessage
                        show={
                          (!!errors?.password && !!errors?.password?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.password?.message}
                      </Form.ErrorMessage>
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
                    required: "Confirm password must be matched",
                    validate: (value) =>
                      value === password || "Confirm Password did not match",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" style={style} inside>
                        <InputGroup.Addon>
                          <FaLock />
                        </InputGroup.Addon>
                        <Input
                          {...field}
                          type={visible2 ? "text" : "password"}
                          placeholder="Confirm Password"
                        />
                        <InputGroup.Button
                          onClick={() => {
                            setVisible2(!visible2);
                          }}
                        >
                          {visible2 ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                      </InputGroup>
                      <Form.ErrorMessage
                        show={
                          (!!errors?.confirmPassword &&
                            !!errors?.confirmPassword?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.confirmPassword?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                loading={isLoading}
                type="submit"
                size="lg"
                className="!rounded-full !px-8 !py-3.5 "
                appearance="default"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
        {/* login and reset buttons */}
        <div className="mt-5">
          <p className="font-semibold">
            Already have an Account?{" "}
            <Link
              className="text-blue-800 hover:underline"
              href="/service-provider/login"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {/* right image */}
      <div className="col-span-1 bg-[#29429f] w-full max-lg:hidden flex justify-center items-center     h-screen sticky top-0">
        <Image
          className="object-cover"
          src={serviceProviderLoginImage}
          alt="Service Provider Sign-Up Image"
        />
      </div>
    </div>
  );
};

export default ServiceProviderSignUpPage;
