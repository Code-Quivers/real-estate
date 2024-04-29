"use client";

import { useUpdateServiceProviderMyProfileMutation } from "@/redux/features/serviceProvider/serviceProviderApi";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input } from "rsuite";
import ServiceProviderProfilePhotoUpload from "./ServiceProviderProfilePhotoUpload";
import Link from "next/link";

const ServiceProviderProfileInformationEdit = ({ myProfileData }) => {
  const router = useRouter();
  const [updateMyServiceProviderMyProfile, { isLoading }] = useUpdateServiceProviderMyProfileMutation();
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

    const res = await updateMyServiceProviderMyProfile({
      serviceProviderId: myProfileData?.serviceProviderId,
      data: formData,
    });
    if (res?.data?.success === true) router.push("/service-provider");
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
              name="companyName"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className=" font-medium text-lg">Company Name</label>
                  <Input defaultValue={myProfileData?.companyName} {...field} type="text" />
                </div>
              )}
            />
            <Controller
              name="companyAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-lg font-medium">Company Address</label>
                  <Input defaultValue={myProfileData?.companyAddress} {...field} type="text" />
                </div>
              )}
            />
          </div>
          {/* company phone number */}
          <div className="col-span-2 space-y-5">
            <Controller
              name="companyPhoneNumber"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-lg font-medium">Company Phone Number</label>
                  <Input defaultValue={myProfileData?.companyPhoneNumber} {...field} type="text" />
                </div>
              )}
            />
            <Controller
              name="companyEmailAddress"
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please provide valid Email",
                },
              }}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-lg font-medium">Company Email Address</label>
                  <div className="rs-form-control-wrapper w-full ">
                    <Input className="!w-full" defaultValue={myProfileData?.companyEmailAddress} {...field} type="text" />
                    <Form.ErrorMessage show={(!!errors?.companyEmailAddress && !!errors?.companyEmailAddress?.message) || false} placement="topEnd">
                      {errors?.companyEmailAddress?.message}
                    </Form.ErrorMessage>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="col-span-2 space-y-5 pb-20">
            <label className="text-lg   font-medium">Profile Image</label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => <ServiceProviderProfilePhotoUpload defaultImage={myProfileData?.profileImage} field={field} />}
            />
          </div>
        </div>

        <div className=" flex justify-end gap-5">
          <Button
            as={Link}
            href="/service-provider"
            type="button"
            className={`!px-10 whitespace-pre-wrap  !py-5 !bg-[#ffffff]  
            hover:!bg-[#0a0a0a]
            !text-white !rounded-2xl `}
            size="lg"
            appearance="link"
          >
            CANCEL
          </Button>
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

export default ServiceProviderProfileInformationEdit;
