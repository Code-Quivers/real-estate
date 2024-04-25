"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import moment from "moment";
import { fileUrlKey } from "@/configs/envConfig";
import PropertyOwnerChart from "@/components/property-owner/profile/PropertyOwnerChart";
import DashboardInfo from "@/components/property-owner/dashboard/DashboardInfo";

const PropertyOwnerInformation = () => {
  const { data } = useGetPropertyOwnerMyProfileQuery(null);
  const { data: myProfileData } = data || {};
  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-3    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between lg:mr-10 ">
        <div className="col-span-4 flex max-md:flex-col    justify-start max-md:gap-2  md:justify-start md:items-center  gap-3 my-5">
          <div>
            <Image
              width={80}
              height={80}
              src={myProfileData?.profileImage ? `${fileUrlKey()}/${myProfileData?.profileImage}` : profileLogo}
              className="w-[100px] h-[100px] md:w-[80px] md:h-[80px] object-cover rounded-lg select-none"
              alt="Profile Image"
            />
          </div>
          <div>
            <h4>
              Name : {myProfileData?.firstName ?? "--"} {myProfileData?.lastName ?? "--"}
            </h4>
            <h4>Email Address : {myProfileData?.user?.email ?? "--"}</h4>
            <h4>Phone Number : {myProfileData?.phoneNumber ?? "--"}</h4>
          </div>
        </div>
        <div>
          <div className=" col-span-1 mr-5   flex flex-col-reverse md:flex-col justify-center items-center gap-2 md:gap-4">
            <h5 className="font-medium text-sm md:text-xl">Score</h5>
            <div className=" outline outline-4 md:outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[60px] h-[60px]">
              <div className=" flex w-full flex-col justify-center items-center">
                <span className="font-medium">{myProfileData?.scoreRatio?.score}</span>
                <span className="w-[70%] border-t border-[#b6b6b6]" />
                <span className="font-medium">{myProfileData?.scoreRatio?.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="mt-5">
        {/* Dashboard */}
        <div>
          <div className="flex justify-center">
            <h2 className="text-2xl font-medium">Dashboard</h2>
          </div>
          <div className="flex flex-col-reverse max-md:gap-y-10 md:grid md:grid-cols-1   lg:grid-cols-6 gap-5 mt-5 items-center">
            <div className="w-full md:col-span-1 lg:col-span-3 ">
              <DashboardInfo />
            </div>
            <div className="w-full md:col-span-1 lg:col-span-3 space-y-5">
              <PropertyOwnerChart />
              <PropertyOwnerChart />
            </div>
          </div>
        </div>
        <div className="border mt-10 shadow-md bg-white rounded-xl">
          <div className="px-5 py-2   flex justify-between items-center">
            <h2 className="text-xl font-medium ">Profile Details</h2>
          </div>
          <div className="grid p-3 lg:p-5 border-t md:grid-cols-2  gap-5 gap-x-10 ">
            <div className="space-y-2">
              <h2 className="font-bold text-xl 2xl:text-2xl">Full Name</h2>
              {console.log(myProfileData)}
              <p className="text-lg font-medium">
                {myProfileData?.firstName ?? "--"} {myProfileData?.lastName ?? "--"}
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-xl 2xl:text-2xl">Phone Number</h2>
              <p className="text-lg font-medium">{myProfileData?.phoneNumber ?? "--"}</p>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-xl 2xl:text-2xl">Account Registered</h2>
              <p className="text-lg font-medium">{moment(myProfileData?.createdAt).format("lll")}</p>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-xl 2xl:text-2xl">Total Units</h2>
              <p className="text-lg font-medium">{myProfileData?._count?.properties ?? "--"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerInformation;
