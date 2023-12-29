"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import ServiceProviderDashboardButton from "@/components/Shared/Button/ServiceProviderDashboardButton";
import { useSearchParams } from "next/navigation";
import ServiceProviderProfileInformationEdit from "@/components/service-provider/information/ServiceProviderProfileInformationEdit";
import ServiceProviderServiceInformationEdit from "@/components/service-provider/information/ServiceProviderServiceInformationEdit";
import { useGetServiceProviderMyProfileQuery } from "@/redux/features/serviceProvider/serviceProviderApi";

const ServiceProviderProfileInformation = () => {
  const paramsName = useSearchParams().get("editing");

  const { data, isLoading, isError, error } =
    useGetServiceProviderMyProfileQuery(null);
  const { data: myProfileData } = data || {};

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-10    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 mt-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between  lg:mr-10 ">
        <div className="col-span-4 flex   justify-start max-md:gap-2  md:justify-start items-center md:gap-3 ">
          <div className="border shadow-lg rounded-full">
            <Image
              src={profileLogo}
              className="max-md:w-[80px] md:w-[150px]  select-none"
              alt="Profile Image"
            />
          </div>
          <div>
            <h4 className="text-lg font-medium">Name </h4>
            <h4 className="text-lg font-medium">Email Address </h4>
            <h4 className="text-lg font-medium">Phone Number</h4>
          </div>
        </div>
        {/* score */}
        <div>
          <div className=" col-span-1 mr-5   flex flex-col-reverse md:flex-col justify-center items-center gap-2 md:gap-4">
            <h5 className="font-medium text-sm md:text-xl">Score</h5>
            <div className=" outline outline-4 md:outline-6 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  px-4">
              <div className=" flex w-full flex-col justify-center items-center">
                <span className="font-medium">9</span>
                <span className="w-[70%] border-t border-[#b6b6b6]" />
                <span className="font-medium">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard */}
      <div className="grid mt-10 lg:mt-5   grid-cols-2 md:grid-cols-8 md:mr-3 lg:mr-0 lg:grid-cols-8 gap-5">
        {/* button */}
        <div className="flex col-span-1 md:col-span-4   justify-end">
          <ServiceProviderDashboardButton
            firstTitle="Profile"
            secondTitle="Information"
            href="/service-provider?editing=account-information"
          />
        </div>
        {/* button */}
        <div className="flex justify-start  col-span-1 md:col-span-4">
          <ServiceProviderDashboardButton
            firstTitle="Service"
            secondTitle="Information"
            href="/service-provider?editing=service-information"
          />
        </div>
      </div>

      {paramsName === null && (
        <div className="grid grid-cols-2  gap-5 gap-x-10 mt-10">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">Company Name</h2>
            <p className="text-lg font-medium">
              {myProfileData?.companyName ?? "--"}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">Company Phone</h2>
            <p className="text-lg font-medium">
              {myProfileData?.companyPhoneNumber ?? "--"}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">Company Address</h2>
            <p className="text-lg font-medium">
              {myProfileData?.companyAddress ?? "--"}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">Company Email</h2>
            <p className="text-lg font-medium">
              {myProfileData?.companyEmailAddress ?? "--"}
            </p>
          </div>
        </div>
      )}

      {paramsName === "account-information" && (
        <ServiceProviderProfileInformationEdit myProfileData={myProfileData} />
      )}
      {paramsName === "service-information" && (
        <ServiceProviderServiceInformationEdit myProfileData={myProfileData} />
      )}
    </section>
  );
};

export default ServiceProviderProfileInformation;
