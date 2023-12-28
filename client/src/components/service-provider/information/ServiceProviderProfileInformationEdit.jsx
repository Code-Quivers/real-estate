"use client";

import { useUpdateMyServiceProviderMyProfileMutation } from "@/redux/features/serviceProvider/serviceProviderApi";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "rsuite";

const ServiceProviderProfileInformationEdit = ({ myProfileData }) => {
  const [
    updateMyServiceProviderMyProfile,
    { isLoading, isError, isSuccess, error },
  ] = useUpdateMyServiceProviderMyProfileMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfileInformation = async (data) => {
    const formData = new FormData();
    const updatedProfileData = JSON.stringify(data);
    formData.append("data", updatedProfileData);

    const res = await updateMyServiceProviderMyProfile({
      serviceProviderId: myProfileData?.serviceProviderId,
      data: formData,
    });
    console.log(res);
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
                  <Input {...field} type="text" />
                </div>
              )}
            />
            <Controller
              name="companyAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-lg font-medium">Company Address</label>
                  <Input {...field} type="text" />
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
                  <label className="text-lg font-medium">
                    Company Phone Number
                  </label>
                  <Input {...field} type="text" />
                </div>
              )}
            />
            <Controller
              name="companyEmailAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-lg font-medium">
                    Company Email Address
                  </label>
                  <Input {...field} type="text" />
                </div>
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceProviderProfileInformationEdit;
