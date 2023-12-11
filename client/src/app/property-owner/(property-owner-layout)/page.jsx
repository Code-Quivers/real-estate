"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { IconButton } from "rsuite";
import { FaPencilAlt } from "react-icons/fa";

const PropertyOwnerInformation = () => {
  return (
    <section className="max-w-[1050px]  mb-5  2xl:mx-auto lg:px-5    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between lg:mr-10 ">
        <div className="col-span-4 flex    justify-start max-md:gap-2  md:justify-start items-center ">
          <div>
            <Image
              src={profileLogo}
              className="max-md:w-[80px] select-none"
              alt="Profile Image"
            />
          </div>
          <div>
            <h4>Name </h4>
            <h4>Email Address </h4>
            <h4>Phone Number</h4>
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
      <div className="grid md:grid-cols-1 md:mr-3 lg:mr-0 lg:grid-cols-7">
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
        <div className="col-span-1 lg:col-span-4">h2llo</div>
      </div>
    </section>
  );
};

export default PropertyOwnerInformation;
