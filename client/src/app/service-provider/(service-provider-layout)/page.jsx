/* eslint-disable no-unused-vars */
"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import ServiceProviderDashboardButton from "@/components/Shared/Button/ServiceProviderDashboardButton";
import { useSearchParams } from "next/navigation";
import ServiceProviderProfileInformationEdit from "@/components/service-provider/information/ServiceProviderProfileInformationEdit";
import ServiceProviderServiceInformationEdit from "@/components/service-provider/information/ServiceProviderServiceInformationEdit";
import { useGetServiceProviderMyProfileQuery } from "@/redux/features/serviceProvider/serviceProviderApi";
import { fileUrlKey } from "@/configs/envConfig";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

const ServiceProviderProfileInformation = () => {
  const paramsName = useSearchParams().get("editing");

  const { data, isLoading, isError, error } = useGetServiceProviderMyProfileQuery(null);
  const { data: myProfileData } = data || {};

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-3    2xl:px-0 ">
      {/* profile Information */}

      <div className="grid grid-cols-5 mt-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between  lg:mr-10 ">
        <div className="col-span-5 md:col-span-4 flex max-md:flex-col   justify-start max-md:gap-2  md:justify-start md:items-center md:gap-3 ">
          <div className="md:border md:shadow-lg md:rounded-full">
            <Image
              width={200}
              height={200}
              src={myProfileData?.profileImage ? ` ${fileUrlKey()}/${myProfileData?.profileImage}` : profileLogo}
              className="  rounded-lg md:w-[150px]  select-none"
              alt="Profile Image"
            />
          </div>
          <div className="max-md:border max-md:p-3 max-md:shadow-lg max-md:space-y-3">
            <h4 className="text-lg font-medium">
              Company Name : <span className="max-md:block">{`${myProfileData?.companyName ? myProfileData?.companyName : "-"}`}</span>
            </h4>
            <h4 className="text-lg font-medium">
              Company Email Address : {myProfileData?.companyEmailAddress ? myProfileData?.companyEmailAddress : "-"}
            </h4>
            <h4 className="text-lg font-medium">
              Company Phone Number : {myProfileData?.companyPhoneNumber ? myProfileData?.companyPhoneNumber : "-"}
            </h4>
          </div>
        </div>
        {/* score */}
        <div>
          <div className=" max-md:mt-5 col-span-1 mr-5   flex flex-col-reverse md:flex-col justify-center items-center gap-2 md:gap-4">
            <h5 className="font-medium text-sm md:text-xl">Score</h5>
            <div className=" outline outline-4 md:outline-6 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  px-4">
              <div className=" flex w-full flex-col justify-center items-center">
                <span className="font-medium">{myProfileData?.scoreRatio?.score ?? 0}</span>
                <span className="w-[70%] border-t border-[#b6b6b6]" />
                <span className="font-medium">{myProfileData?.scoreRatio?.total ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard */}

      <div className="grid mt-10 lg:mt-5   grid-cols-2 md:grid-cols-8 md:mr-3 lg:mr-0 lg:grid-cols-8 gap-5">
        {/* button */}
        <div className="flex col-span-1 md:col-span-4   justify-end">
          <ServiceProviderDashboardButton firstTitle="Profile" secondTitle="Information" href="/service-provider?editing=account-information" />
        </div>
        {/* button */}
        <div className="flex justify-start  col-span-1 md:col-span-4">
          <ServiceProviderDashboardButton firstTitle="Service" secondTitle="Information" href="/service-provider?editing=service-information" />
        </div>
      </div>

      {paramsName === null && (
        <>
          {/* profile details */}
          <div className="border mt-10 shadow-lg">
            <div className="px-5 py-2 bg-[#29439f23]  flex justify-between items-center">
              <h2 className="text-xl font-medium ">Profile Details</h2>
              <Link
                href={{
                  query: { editing: "account-information" },
                }}
              >
                <button className="p-2  hover:bg-[#29429f] hover:text-white text-[#29429f]  hover:border-black/50">
                  <MdEdit size={25} />
                </button>
              </Link>
            </div>
            <div className="grid p-3 lg:p-5 border-t md:grid-cols-2  gap-5 gap-x-10 ">
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Company Name</h2>
                <p className="text-lg font-medium">{myProfileData?.companyName ? myProfileData?.companyName : "-"}</p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Company Phone</h2>
                <p className="text-lg font-medium">{myProfileData?.companyPhoneNumber ? myProfileData?.companyPhoneNumber : "-"}</p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Company Address</h2>
                <p className="text-lg font-medium">{myProfileData?.companyAddress ? myProfileData?.companyAddress : "-"}</p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Company Email</h2>
                <p className="text-lg font-medium">{myProfileData?.companyEmailAddress ? myProfileData?.companyEmailAddress : "-"}</p>
              </div>
            </div>
          </div>
          {/* Service Details */}
          <div className="border mt-10 shadow-lg">
            <div className="px-5 py-2 bg-[#29439f23]  flex justify-between items-center">
              <h2 className="text-xl font-medium ">Service Details</h2>
              <Link
                href={{
                  query: { editing: "service-information" },
                }}
              >
                <button className="p-2  hover:bg-[#29429f] hover:text-white text-[#29429f]  hover:border-black/50">
                  <MdEdit size={25} />
                </button>
              </Link>
            </div>
            <div className="grid p-5 border-t lg:grid-cols-2  gap-5 gap-x-10 ">
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Service Location</h2>
                <p className="text-lg font-medium">{myProfileData?.Service?.serviceLocation ?? "--"}</p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Service Availability</h2>
                <p className="text-lg font-medium">{myProfileData?.Service?.serviceAvailability ?? "--"}</p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Service Type</h2>
                <p className="text-lg font-medium">{myProfileData?.Service?.serviceType ?? "--"}</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Price Range</h2>
                <p className="text-lg font-medium">
                  {`${myProfileData?.Service?.minPrice}$` ?? "--"} <span>-</span> {`${myProfileData?.Service?.maxPrice}$` ?? "--"}
                </p>
              </div>
            </div>
            {/* service description */}
            <div className="border-t-2">
              <div className="space-y-2 p-5">
                <h2 className="font-bold text-xl 2xl:text-2xl">Service Description</h2>
                <p className="text-lg whitespace-pre-wrap font-medium">{myProfileData?.Service?.serviceDescription ?? "--"}</p>
              </div>
              <div className="space-y-2 p-5 border-t">
                <h2 className="font-bold text-xl 2xl:text-2xl">Service Cancellation Policy</h2>
                <p className="text-lg whitespace-pre-wrap font-medium">{myProfileData?.Service?.serviceCancellationPolicy ?? "--"}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {paramsName === "account-information" && <ServiceProviderProfileInformationEdit myProfileData={myProfileData} />}
      {paramsName === "service-information" && <ServiceProviderServiceInformationEdit myProfileData={myProfileData} />}
    </section>
  );
};

export default ServiceProviderProfileInformation;
