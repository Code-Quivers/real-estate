"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Input, MaskedInput, Modal, Notification, useToaster } from "rsuite";
import { useEffect, useState } from "react";
import { useUpdateTenantProfileMutation } from "@/redux/features/tenant/tenantsApi";

//
const TenantSettingModalForm = ({ open, handleClose, myProfileData }) => {
  const toaster = useToaster();
  const [updateTenantProfile, { data: updateMyProfileRes, isLoading, isError, isSuccess, error, reset }] = useUpdateTenantProfileMutation();

  const [optionNumber] = useState({
    name: "US phone number",
    mask: ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    placeholder: "(XXX) XXX-XXX",
  });

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

    await updateTenantProfile({
      tenantId: myProfileData?.tenantId,
      data: formData,
    });
  };
  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      toaster.push(
        <Notification type="success" header="Success" closable>
          {updateMyProfileRes?.message || "Successfully Updated"}
        </Notification>,
        { placement: "bottomStart", duration: 5000 },
      );
      reset();
      handleClose();
      resetForm();
    }
    // if failed
    if (!isLoading && !isSuccess && isError) {
      toaster.push(
        <Notification header="Failed" type="error" closable>
          {error?.message || "Failed to Updated"}
        </Notification>,
        { placement: "bottomStart", duration: 5000 },
      );
      reset();
      handleClose();
      resetForm();
    }
  }, [isLoading, isSuccess, isError, updateMyProfileRes, error, reset]);

  return (
    <div>
      <Modal
        overflow={false}
        backdrop="static"
        dialogAs="div"
        size="lg"
        className="bg-white mx-auto mt-20 rounded-xl"
        open={open}
        onClose={() => {
          reset();
          handleClose();
          resetForm();
        }}
      >
        <Modal.Body className="p-3   " classPrefix=" !w-full">
          <div className="      rounded-xl p-3">
            {/* title */}
            <div className="flex justify-center">
              <h2 className="font-semibold text-xl">Account Information</h2>
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
                          <Input size="lg" defaultValue={myProfileData?.firstName} {...field} type="text" />
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <label className="font-medium text-base">Last Name</label>
                          <Input size="lg" defaultValue={myProfileData?.lastName} {...field} type="text" />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-4 lg:flex items-start justify-between gap-10">
                  <div className="w-full">
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <label className="text-base font-medium">Phone Number</label>
                          {/* <Input size="lg" defaultValue={myProfileData?.phoneNumber} {...field} type="text" /> */}
                          <MaskedInput
                            className="!w-full"
                            {...field}
                            defaultValue={myProfileData?.phoneNumber}
                            mask={optionNumber.mask}
                            guide
                            // showMask
                            size="lg"
                            keepCharPositions={true}
                            placeholder={optionNumber.placeholder}
                            placeholderChar={"_"}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-full space-y-2 max-md:mt-2">
                    <label className="text-base font-medium">Password</label>
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
                        <div className=" rs-form-control-wrapper  w-full">
                          <Input size="lg" placeholder="********" {...field} className="!w-full" type="password" />
                        </div>
                      )}
                    />

                    <div className="h-16 text-xs mt-2 font-medium text-white">
                      {errors?.password?.type === "pattern" && <p className="bg-red-300 p-2 rounded-md">{errors?.password?.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* button */}
              <div className="  flex gap-5 justify-end">
                <Button
                  onClick={() => {
                    reset();
                    handleClose();
                    resetForm();
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
    </div>
  );
};

export default TenantSettingModalForm;
