/* eslint-disable no-unused-vars */
"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Input, MaskedInput, Message, Modal, useToaster } from "rsuite";
import { useEffect, useState } from "react";
import { useUpdateServiceProviderMyProfileMutation } from "@/redux/features/serviceProvider/serviceProviderApi";

const ServiceProviderEditModal = ({ open, myProfileData, handleClose }) => {
  const [optionNumber] = useState({
    name: "US phone number",
    mask: ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    placeholder: "(XXX) XXX-XXX",
  });
  const toaster = useToaster();
  const [updateServiceProviderMyProfile, { data: updateMyProfileRes, isLoading, isError, isSuccess, error, reset }] =
    useUpdateServiceProviderMyProfileMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();

  const handleUpdateProfileInformation = async ({ ...data }) => {
    const formData = new FormData();
    const obj = {
      ...data,
    };

    const updatedProfileData = JSON.stringify(obj);

    formData.append("data", updatedProfileData);

    await updateServiceProviderMyProfile({
      serviceProviderId: myProfileData?.serviceProviderId,
      data: formData,
    });
  };
  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      toaster.push(
        <Message showIcon centered type="success" closable>
          Successfully Updated
        </Message>,
        { placement: "bottomStart", duration: 5000 },
      );
      reset();
      handleClose();
      resetForm();
    }
  }, [isLoading, isSuccess, isError, updateMyProfileRes, error, reset]);

  return (
    <Modal
      backdrop="static"
      size="lg"
      overflow={false}
      open={open}
      onClose={() => {
        resetForm();
        handleClose();
      }}
      dialogAs="div"
      className="bg-white rounded-xl mt-5   flex mx-auto justify-center items-center"
    >
      <Modal.Body className="p-3   " classPrefix=" !w-full">
        <div className="  border   rounded-xl p-3">
          {/* title */}
          <div className="flex justify-center">
            <h2 className="font-semibold text-xl">Profile Information</h2>
          </div>
          {/* forms */}
          <form onSubmit={handleSubmit(handleUpdateProfileInformation)}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-10 mt-3">
              {/* name */}
              <div className="col-span-2 lg:col-span-4 lg:flex items-center justify-between gap-10">
                <div className="w-full">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="font-medium text-base">First Name</label>
                        <Input defaultValue={myProfileData?.firstName} {...field} type="text" />
                      </div>
                    )}
                  />
                </div>
                <div className="w-full">
                  {" "}
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="font-medium text-base">Last Name</label>
                        <Input defaultValue={myProfileData?.lastName} {...field} type="text" />
                      </div>
                    )}
                  />
                </div>
              </div>{" "}
              <div className=" col-span-2 lg:col-span-4 lg:flex items-start justify-between gap-10">
                <div className="w-full">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="text-base font-medium">Phone Number</label>
                        {/* <Input defaultValue={myProfileData?.phoneNumber} {...field} type="text" /> */}
                        <MaskedInput
                          className="!w-full"
                          {...field}
                          defaultValue={myProfileData?.phoneNumber}
                          mask={optionNumber.mask}
                          guide
                          // showMask
                          keepCharPositions={true}
                          placeholder={optionNumber.placeholder}
                          placeholderChar={"_"}
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="w-full">
                  <Controller
                    name="password"
                    rules={{
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{6,}$/,
                        message:
                          "Password should include at least 1 lowercase & uppercase letter, 1 special character (e.g., @, #, $), and be at least 6 characters long",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="text-base font-medium">Password</label>
                        <Input placeholder="********" {...field} autoComplete="off" type="password" />
                      </div>
                    )}
                  />{" "}
                  <div className="h-16 text-xs mt-2 font-medium text-white">
                    {errors?.password?.type === "pattern" && <p className="bg-red-300 p-2 rounded-md">{errors?.password?.message}</p>}
                  </div>
                </div>{" "}
              </div>
            </div>

            {/* button */}
            <div className="flex gap-5 justify-end">
              <Button
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
                type="button"
                className={`!px-10 whitespace-pre-wrap  !py-4
            hover:!bg-[#1d3796]
            !text-white !rounded-2xl `}
                size="lg"
                appearance="default"
              >
                CANCEL
              </Button>
              <Button
                loading={isLoading}
                type="submit"
                className={`!px-10 whitespace-pre-wrap  !py-4 !bg-[#29429f]  
            hover:!bg-[#1d3796]
            !text-white !rounded-2xl `}
                size="lg"
                appearance="default"
              >
                SAVE
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceProviderEditModal;
