"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "rsuite";
import PropertyOwnerUploadImageEdit from "./PropertyOwnerUploadImageEdit";
import { useUpdatePropertyOwnerProfileMutation } from "@/redux/features/propertyOwner/propertyOwnerApi";

const PropertyOwnerProfileEdit = ({ myProfileData }) => {
  const router = useRouter();
  const [updatePropertyOwnerProfile, { isLoading, isError, isSuccess, error }] =
    useUpdatePropertyOwnerProfileMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfileInformation = async (data) => {
    console.log(data);
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
    if (res?.data?.success === true) router.push("/property-owner");
  };
  return (
    <div className="mt-6">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Profile Information</h2>
      </div>
      {/* forms */}
      <form onSubmit={handleSubmit(handleUpdateProfileInformation)}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
          {/* left */}
          <div className="col-span-2 space-y-5">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="font-medium text-lg">First Name</label>
                  <Input
                    defaultValue={myProfileData?.firstName}
                    {...field}
                    type="text"
                  />
                </div>
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-lg font-medium">Phone Number</label>
                  <Input
                    defaultValue={myProfileData?.phoneNumber}
                    {...field}
                    type="text"
                  />
                </div>
              )}
            />
          </div>
          {/* company phone number */}
          <div className="col-span-2 space-y-5">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className=" font-medium text-lg">Last Name</label>
                  <Input
                    defaultValue={myProfileData?.lastName}
                    {...field}
                    type="text"
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className="col-span-2 mt-5 space-y-5 ">
          <label className="text-lg   font-medium">Profile Image</label>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <PropertyOwnerUploadImageEdit
                defaultImage={myProfileData?.profileImage}
                field={field}
              />
            )}
          />
        </div>
        <div className="mt-10 flex justify-end">
          <Button
            loading={isLoading}
            type="submit"
            className={`!px-10 whitespace-pre-wrap  !py-5 !bg-[#29429f]  
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
  );
};

export default PropertyOwnerProfileEdit;