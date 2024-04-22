"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Input, Modal } from "rsuite";
import PropertyOwnerUploadImageEdit from "./PropertyOwnerUploadImageEdit";
import { useUpdatePropertyOwnerProfileMutation } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useEffect } from "react";

const PropertyOwnerProfileEditModal = ({ open, myProfileData, handleClose }) => {
  const [updatePropertyOwnerProfile, { isLoading, isError, isSuccess, error, reset }] = useUpdatePropertyOwnerProfileMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfileInformation = async (data) => {
    const formData = new FormData();
    const obj = {
      ...data,
      oldFilePath: undefined,
    };

    const updatedProfileData = JSON.stringify(obj);
    if (data?.file?.blobFile) obj["oldFilePath"] = myProfileData?.profileImage;
    if (data?.file?.blobFile) formData.append("file", data?.file?.blobFile);
    formData.append("data", updatedProfileData);

    const res = await updatePropertyOwnerProfile({
      propertyOwnerId: myProfileData?.propertyOwnerId,
      data: formData,
    });
    if (res?.data?.success === true) handleClose();
  };

  useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      //
    }
  }, []);

  return (
    <Modal
      size="lg"
      open={open}
      // classPrefix="!rounded-2xl"
      onClose={handleClose}
      dialogAs="div"
      className="bg-white rounded-xl mt-5 flex mx-auto justify-center items-center  "
    >
      <Modal.Body className="p-3  min-h-[750px] md:min-h-[620px] " classPrefix=" !w-full">
        <div className="  border   rounded-xl p-3">
          {/* title */}
          <div className="flex justify-center">
            <h2 className="font-semibold text-xl">Profile Information</h2>
          </div>
          {/* forms */}
          <form onSubmit={handleSubmit(handleUpdateProfileInformation)}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-3">
              {/* name */}
              <div className="col-span-2 lg:col-span-4 lg:flex items-center justify-between gap-10">
                <div className="w-full">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
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
                      <div className="space-y-1">
                        <label className="font-medium text-base">Last Name</label>
                        <Input defaultValue={myProfileData?.lastName} {...field} type="text" />
                      </div>
                    )}
                  />
                </div>
              </div>{" "}
              <div className="col-span-2 lg:col-span-4 lg:flex items-center justify-between gap-10">
                <div className="w-full">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <label className="text-base font-medium">Phone Number</label>
                        <Input defaultValue={myProfileData?.phoneNumber} {...field} type="text" />
                      </div>
                    )}
                  />
                </div>
                <div className="w-full">
                  {" "}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <label className="text-base font-medium">Password</label>
                        <Input placeholder="********" {...field} type="password" />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4 mt-5 space-y-5 ">
              <label className="text-lg   font-medium">Profile Image</label>
              <Controller
                name="file"
                control={control}
                render={({ field }) => <PropertyOwnerUploadImageEdit defaultImage={myProfileData?.profileImage} field={field} />}
              />
            </div>
            <div className="mt-10 flex gap-5 justify-end">
              <Button
                onClick={handleClose}
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

export default PropertyOwnerProfileEditModal;
