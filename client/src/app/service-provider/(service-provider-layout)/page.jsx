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
import Score from "@/components/Shared/Score/Score";

const ServiceProviderProfileInformation = () => {
  const paramsName = useSearchParams().get("editing");

  const { data, isLoading, isError, error } = useGetServiceProviderMyProfileQuery(null);
  const { data: myProfileData } = data || {};

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-2    lg font-semibold:px-0 ">
      {/* profile Information */}

      <div className="flex justify-between items-center   my-5 pr-3 gap-3">
        <div className="flex max-md:flex-col   w-full    md:justify-between md:items-center md:gap-3">
          <div className="md:shadow-lg md:rounded-full">
            <Image
              width={200}
              height={200}
              src={myProfileData?.profileImage ? ` ${fileUrlKey()}/${myProfileData?.profileImage}` : profileLogo}
              className="  rounded-lg md:w-[150px]  select-none"
              alt="Profile Image"
            />
          </div>
          {/* details  */}
          <div className="w-full  rounded-lg max-md:space-y-3">
            <h4 className="">Company Name : {`${myProfileData?.companyName ? myProfileData?.companyName : "N/A"}`}</h4>
            <h4 className="">Company Email Address : {myProfileData?.companyEmailAddress ? myProfileData?.companyEmailAddress : "N/A"}</h4>
            <h4 className="">Company Phone Number : {myProfileData?.companyPhoneNumber ? myProfileData?.companyPhoneNumber : "N/A"}</h4>
          </div>
        </div>
        {/* score */}
        <div>
          <Score
            score={myProfileData?.scoreRatio?.score ? myProfileData?.scoreRatio?.score : 0}
            total={myProfileData?.scoreRatio?.total ? myProfileData?.scoreRatio?.total : 0}
          />
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
          <div className="border rounded-xl bg-white mt-10 md:shadow-lg">
            <div className="px-5 py-2   flex justify-between items-center">
              <h2 className="text-lg font-semibold  ">Profile Details</h2>
              <Link
                href={{
                  query: { editing: "account-information" },
                }}
              >
                <button className="p-2 hover:bg-[#29429f] hover:text-white rounded-lg duration-300 transition-all text-[#29429f]  hover:border-black/50">
                  <MdEdit size={25} />
                </button>
              </Link>
            </div>

            {/* data */}
            <div className="grid p-5 border-t lg:grid-cols-2  gap-5 gap-x-10 ">
              <div className="space-y-2">
                <h2 className="text-[#4b5563]">Company Name</h2>
                <p className="">{myProfileData?.companyName ? myProfileData?.companyName : "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Company Phone</h2>
                <p className="">{myProfileData?.companyPhoneNumber ? myProfileData?.companyPhoneNumber : "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Company Address</h2>
                <p className="">{myProfileData?.companyAddress ? myProfileData?.companyAddress : "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Company Email</h2>
                <p className="">{myProfileData?.companyEmailAddress ? myProfileData?.companyEmailAddress : "N/A"}</p>
              </div>
              <div className="lg:col-span-2">
                <hr />
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">First Name</h2>
                <p className="">{myProfileData?.firstName ? myProfileData?.firstName : "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Last Name</h2>
                <p className="">{myProfileData?.lastName ? myProfileData?.lastName : "N/A"}</p>
              </div>{" "}
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Phone Number</h2>
                <p className="">{myProfileData?.phoneNumber ? myProfileData?.phoneNumber : "N/A"}</p>
              </div>
            </div>
          </div>
          {/* Service Details */}
          <div className="border rounded-xl bg-white mt-10 md:shadow-lg">
            <div className="px-5 py-2 flex justify-between items-center">
              <h2 className="text-lg font-semibold  ">Service Details</h2>
              <Link
                href={{
                  query: { editing: "service-information" },
                }}
              >
                <button className="p-2 hover:bg-[#29429f] hover:text-white rounded-lg duration-300 transition-all text-[#29429f]  hover:border-black/50">
                  <MdEdit size={25} />
                </button>
              </Link>
            </div>
            <div className="grid p-5 border-t lg:grid-cols-2  gap-5 gap-x-10 ">
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Service Location</h2>
                <p className="">{myProfileData?.Service?.serviceLocation ? myProfileData?.Service?.serviceLocation : "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Service Availability</h2>
                <p className="">
                  {myProfileData?.Service?.serviceAvailability
                    ? myProfileData?.Service?.serviceAvailability
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                    : "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Service Type</h2>
                <p className="">
                  {myProfileData?.Service?.serviceType
                    ? myProfileData?.Service?.serviceType
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                    : "N/A"}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className=" text-[#4b5563]">Price Range</h2>
                <p className="">
                  {myProfileData?.Service?.minPrice ? `${myProfileData?.Service?.minPrice?.toLocaleString()}$` : "N/A"} <span>-</span>{" "}
                  {myProfileData?.Service?.maxPrice ? `${myProfileData?.Service?.maxPrice?.toLocaleString()}$` : "N/A"}
                </p>
              </div>
            </div>
            {/* service description */}
            <div className="border-t-2">
              <div className="space-y-2 p-5">
                <h2 className=" text-[#4b5563]">Service Description</h2>
                <p className="whitespace-pre-wrap ">
                  {myProfileData?.Service?.serviceDescription ? myProfileData?.Service?.serviceDescription : "N/A"}
                </p>
              </div>
              <div className="space-y-2 p-5 border-t">
                <h2 className=" text-[#4b5563]">Service Cancellation Policy</h2>
                <p className="whitespace-pre-wrap ">
                  {myProfileData?.Service?.serviceCancellationPolicy ? myProfileData?.Service?.serviceCancellationPolicy : "N/A"}
                </p>
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
