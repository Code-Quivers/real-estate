/* eslint-disable no-unused-vars */
"use client";

import { serviceAvailability, serviceTypes } from "@/constants/serviceConst";
import { useUpdateServiceInformationMutation } from "@/redux/features/services/servicesApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Input, InputNumber, SelectPicker } from "rsuite";

const ServiceProviderServiceInformationEdit = ({ myProfileData }) => {
  const router = useRouter();
  const [updateServiceInformation, { isLoading, isError, isSuccess, error }] = useUpdateServiceInformationMutation();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleUpdateServiceInformation = async (data) => {
    if (data?.minPrice) {
      data["minPrice"] = parseFloat(data?.minPrice);
    } else {
      data["minPrice"] = null;
    }
    if (data?.maxPrice) {
      data["maxPrice"] = parseFloat(data?.maxPrice);
    } else {
      data["maxPrice"] = null;
    }

    const res = await updateServiceInformation({ data });
    if (res?.data?.success === true) router.push("/service-provider");
  };

  return (
    <div className="mt-6">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Service Information</h2>
      </div>
      {/* forms */}
      <form onSubmit={handleSubmit(handleUpdateServiceInformation)}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
          {/* left */}
          <div className="col-span-2 space-y-5">
            {/* service type  */}
            <div>
              <div className="space-y-1">
                <label className="text-lg font-medium ">Service Type</label>
                <div>
                  <SelectPicker
                    searchable={false}
                    onChange={(value) => setValue("serviceType", value)}
                    defaultValue={myProfileData?.Service?.serviceType ?? undefined}
                    data={
                      serviceTypes?.map((item) => ({
                        label: item.label,
                        value: item.value,
                      })) ?? []
                    }
                    className="!w-full"
                  />
                </div>
              </div>
            </div>
            {/* Service Description */}
            <div>
              <div className="space-y-1">
                <label className="text-lg   font-medium">Service Description</label>
                <Input
                  defaultValue={myProfileData?.Service?.serviceDescription ?? undefined}
                  onChange={(value) => setValue("serviceDescription", value)}
                  as="textarea"
                  rows={6}
                />
              </div>
            </div>
            {/* Service Price Range */}
            <div className="">
              <h4> Service Price Range</h4>
              <div className="flex items-center gap-3">
                <div className="space-y-1 w-full">
                  <label className="text-lg   font-medium">Min Price</label>
                  <InputNumber
                    defaultValue={myProfileData?.Service?.minPrice ? parseFloat(myProfileData?.Service?.minPrice) : undefined}
                    onChange={(value) => setValue("minPrice", value)}
                    min={0}
                  />
                </div>
                <div className="space-y-1  w-full">
                  <label className="text-lg   font-medium">Max Price</label>
                  <InputNumber
                    defaultValue={myProfileData?.Service?.maxPrice ? parseFloat(myProfileData?.Service?.maxPrice) : undefined}
                    onChange={(value) => setValue("maxPrice", value)}
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="col-span-2 space-y-5">
            {/* Service Availability */}
            <div>
              <div className="space-y-1 max-lg:w-full">
                <label className="text-lg font-medium">Service Availability</label>
                <div>
                  <SelectPicker
                    defaultValue={myProfileData?.Service?.serviceAvailability ?? undefined}
                    onChange={(value) => setValue("serviceAvailability", value)}
                    data={serviceAvailability}
                    searchable={false}
                    className="!w-full"
                  />
                </div>
              </div>
            </div>

            {/* Service location */}
            <div>
              <div className="space-y-1">
                <label className="text-lg   font-medium">Service Location</label>
                <Input
                  type="text"
                  defaultValue={myProfileData?.Service?.serviceLocation ?? undefined}
                  onChange={(value) => setValue("serviceLocation", value)}
                />
              </div>
            </div>
            {/* service cancellation policy */}
            <div>
              <div className="space-y-1">
                <label className="text-lg   font-medium">Service Cancellation Policy</label>
                <Input
                  defaultValue={myProfileData?.Service?.serviceCancellationPolicy ?? undefined}
                  onChange={(value) => setValue("serviceCancellationPolicy", value)}
                  as="textarea"
                  rows={6}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-5">
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

export default ServiceProviderServiceInformationEdit;
