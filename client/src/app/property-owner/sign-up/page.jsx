"use client";

import propertyOwnerSignUpImage from "@/assets/loginPage/property_owner_sign_up.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import { Form, Input, InputGroup, Loader, Notification, useToaster } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useEffect, useState } from "react";
import Link from "next/link";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import { FaLock } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { usePropertyOwnerSignUpMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/hooks/services/auth.service";

const PropertyOwnerSignUpPage = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [propertyOwnerSignUp, { isLoading, error, isSuccess, isError, data }] = usePropertyOwnerSignUpMutation();

  const router = useRouter();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handlePropertyOwnerSignUp = async (user) => {
    const propertyOwnerData = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userName: user?.userName,
      email: user?.email,
      password: user?.password,
    };
    // await propertyOwnerSignUp({ data: propertyOwnerData }).unwrap();

    const res = await propertyOwnerSignUp({ data: propertyOwnerData }).unwrap();
    console.log(res);
    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">Congratulations! Successfully signed up as a Property Owner.</p>
            <hr className="border-t border-gray-300 my-4" />
            <p>Your account is now ready to use.</p>
          </div>
        </Notification>,
        { placement: "bottomEnd" },
      );
      router.push("/property-owner");
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message || "Something went wrong!"}</p>
          </div>
        </Notification>,
        { placement: "bottomEnd" },
      );
      // router.push("/property-owner/login");
    }
  }, [isSuccess, isLoading, isError, error, data]);

  return (
    <div className="grid grid-cols-1 max-lg:mt-10 lg:grid-cols-2">
      <div className="col-span-1 flex flex-col items-center justify-center ">
        <div>
          <h2 className="text-5xl md:mt-0 mt-5 mb-10 font-semibold">Sign Up</h2>
        </div>
        {/* input forms */}
        <div className="w-full max-lg:px-5 lg:w-3/4 mx-auto">
          <form onSubmit={handleSubmit(handlePropertyOwnerSignUp)}>
            <div className="space-y-6 lg:space-y-5">
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
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="First Name" />
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.firstName && !!errors?.firstName?.message) || false} placement="topEnd">
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
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="Last Name" />
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.lastName && !!errors?.lastName?.message) || false} placement="topEnd">
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
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <AvatarIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="Username" />
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.userName && !!errors?.userName?.message) || false} placement="topEnd">
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
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <EmailFillIcon />
                        </InputGroup.Addon>
                        <Input {...field} type="text" placeholder="Email" />
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.email && !!errors?.email?.message) || false} placement="topEnd">
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
                          <FaLock />
                        </InputGroup.Addon>
                        <Input {...field} type={visible ? "text" : "password"} placeholder="Password" />
                        <InputGroup.Button
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
              {/* confirm password */}
              <div>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Confirm password must be matched",
                    validate: (value) => value === password || "Confirm Password did not match",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <InputGroup size="lg" inside>
                        <InputGroup.Addon>
                          <FaLock />
                        </InputGroup.Addon>
                        <Input {...field} type={visible2 ? "text" : "password"} placeholder="Confirm Password" />
                        <InputGroup.Button
                          onClick={() => {
                            setVisible2(!visible2);
                          }}
                        >
                          {visible2 ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                      </InputGroup>
                      <Form.ErrorMessage show={(!!errors?.confirmPassword && !!errors?.confirmPassword?.message) || false} placement="topEnd">
                        {errors?.confirmPassword?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* password requirement */}

            <div className="h-16 text-xs font-medium text-red-500">
              {errors?.password?.type === "pattern" && <p className="py-2 rounded-md">{errors?.password?.message}</p>}
            </div>

            <div className="flex justify-center">
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
                  Sign up
                </button>
              )}
            </div>
          </form>
        </div>
        {/* login and reset buttons */}
        <div className="mt-3 w-full max-lg:px-5 lg:w-3/4 mx-auto text-center">
          <p className="font-semibold">
            Already have an Account?{" "}
            <Link className="text-blue-800 hover:underline" href="/property-owner/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {/* right image */}
      <div className="col-span-1 bg-[#29429f] w-full max-lg:hidden flex justify-center items-center     sticky top-0 border  h-screen">
        <Image className="object-contain" width={800} height={800} src={propertyOwnerSignUpImage} alt="Property Owner Sign-Up Image" />
      </div>
    </div>
  );
};

export default PropertyOwnerSignUpPage;
