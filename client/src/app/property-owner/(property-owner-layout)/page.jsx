"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { IconButton } from "rsuite";
import { FaPencilAlt } from "react-icons/fa";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import PropertyOwnerProfileEdit from "@/components/property-owner/profile/PropertyOwnerProfileEdit";
import moment from "moment";
import { fileUrlKey } from "@/configs/envConfig";
import PropertyOwnerChart from "@/components/property-owner/profile/PropertyOwnerChart";

const PropertyOwnerInformation = () => {
  const { data } = useGetPropertyOwnerMyProfileQuery(null);
  const { data: myProfileData } = data || {};
  const paramsName = useSearchParams().get("editing");
  return (
    <section className="max-w-[1050px]  mb-5  2xl:mx-auto lg:px-5    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between lg:mr-10 ">
        <div className="col-span-4 flex    justify-start max-md:gap-2  md:justify-start items-center  gap-3 my-5">
          <div>
            <Image
              width={80}
              height={80}
              src={
                myProfileData?.profileImage
                  ? `${fileUrlKey()}/${myProfileData?.profileImage}`
                  : profileLogo
              }
              className="w-[80px] h-[80px] object-cover rounded-lg select-none"
              alt="Profile Image"
            />
          </div>
          <div>
            <h4>
              Name : {myProfileData?.firstName ?? "--"}{" "}
              {myProfileData?.lastName ?? "--"}
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
                <span className="font-medium">9</span>
                <span className="w-[70%] border-t border-[#b6b6b6]" />
                <span className="font-medium">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard */}
      <div>
        <div className="flex justify-center">
          <h2 className="text-2xl font-medium">Dashboard</h2>
        </div>
        <div className="grid md:grid-cols-1   lg:grid-cols-6 gap-5 mt-5 items-center">
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <div className=" flex border   bg-white items-center justify-between px-5 py-6 rounded-2xl">
              <div className="flex gap-3 items-center">
                <h2 className="text-4xl font-semibold">1</h2>
                <p className="text-xl font-medium">Rented Unit</p>
              </div>

              <div className=" outline outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[50px] h-[50px]">
                <div className=" flex w-full flex-col justify-center items-center">
                  <span>1</span>
                  <span className="w-[70%] border-t border-[#b6b6b6]" />
                  <span>1</span>
                </div>
              </div>
            </div>
            <div className="  border bg-white  px-5 py-6   rounded-2xl">
              <h2 className="text-2xl font-semibold">$1900</h2>
              <p className="text-xl font-medium">Rented Collected this month</p>
            </div>
            <div className="  border flex justify-between items-start    px-5 py-6  rounded-2xl bg-white">
              <div>
                <h2 className="text-2xl font-semibold">$230</h2>
                <p className="text-xl font-medium">Cost this month</p>
              </div>
              <div>
                <IconButton
                  icon={<FaPencilAlt size={20} />}
                  appearance="subtle"
                  circle
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3 space-y-5">
            <PropertyOwnerChart />
            <PropertyOwnerChart />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mt-5">
        {paramsName === "account-information" ? (
          <PropertyOwnerProfileEdit myProfileData={myProfileData} />
        ) : (
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
                <h2 className="font-bold text-xl 2xl:text-2xl">Full Name</h2>
                <p className="text-lg font-medium">
                  {myProfileData?.firstName ?? "--"}{" "}
                  {myProfileData?.lastName ?? "--"}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">Phone Number</h2>
                <p className="text-lg font-medium">
                  {myProfileData?.phoneNumber ?? "--"}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">
                  Account Registered Date
                </h2>
                <p className="text-lg font-medium">
                  {moment(myProfileData?.createdAt).format("ll")}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl 2xl:text-2xl">
                  Total Property
                </h2>
                <p className="text-lg font-medium">
                  {myProfileData?._count?.Property ?? "--"}
                </p>
              </div>
            </div>
          </div>
        )}
        <div></div>
      </div>
    </section>
  );
};

export default PropertyOwnerInformation;
