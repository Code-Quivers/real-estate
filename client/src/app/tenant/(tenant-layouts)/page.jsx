"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import TenantProfileInformation from "@/components/tenant/Profile/TenantProfileInformation";
import TenantEditing from "@/components/tenant/Profile/TenantEditing";
import { useState } from "react";
import { Button } from "rsuite";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";

const TenantProfile = () => {
  const [tabActive, setTabActive] = useState(1);
  const {
    data: dataResponse,
    isError,
    isLoading,
    error,
  } = useGetTenantMyProfileQuery();

  const { data } = dataResponse || {};

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 mt-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between  lg:mr-10 ">
        <div className="col-span-4 flex   justify-start max-md:gap-2  md:justify-start items-center md:gap-3 ">
          <div className="border shadow-lg rounded-full">
            <Image
              src={data?.profileImage ?? profileLogo}
              className="max-md:w-[80px] md:w-[150px]  select-none"
              alt="Profile Image"
            />
          </div>
          <div>
            <h4 className="text-lg font-medium">
              {data?.firstName} {data?.lastName}
            </h4>
            <h4 className="text-lg font-medium"> {data?.user?.email} </h4>
            <h4 className="text-lg font-medium">{data?.phoneNumber ?? "--"}</h4>
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
      <div className="mt-10 grid grid-cols-3 lg:grid-cols-5 w-full lg:mt-8 items-stretch gap-2 lg:gap-5">
        {/* Personal Information */}
        <div className=" ">
          <Button
            onClick={() => setTabActive(2)}
            type="button"
            className={`  whitespace-pre-wrap h-full !w-full !py-2 !bg-[#29429f] !text-white !rounded-full `}
            size="md"
            appearance="default"
          >
            Personal <br /> Information
          </Button>
        </div>
        {/* Rental History */}
        <div>
          <Button
            onClick={() => setTabActive(3)}
            type="button"
            className={`  whitespace-pre-wrap h-full !w-full !py-2 !bg-[#29429f] !text-white !rounded-full `}
            size="md"
            appearance="default"
          >
            Rental <br /> History
          </Button>
        </div>
        {/* income information */}
        <div>
          <Button
            onClick={() => setTabActive(4)}
            type="button"
            className={`  whitespace-pre-wrap h-full !w-full !py-2 !bg-[#29429f] !text-white !rounded-full `}
            size="md"
            appearance="default"
          >
            Income <br /> Information
          </Button>
        </div>
        {/* pets */}
        <div>
          <Button
            onClick={() => setTabActive(5)}
            type="button"
            className={`  whitespace-pre-wrap h-full !w-full !py-2 !bg-[#29429f] !text-white !rounded-full `}
            size="md"
            appearance="default"
          >
            Pets
          </Button>
        </div>
        {/* Other Information */}
        <div>
          <Button
            onClick={() => setTabActive(6)}
            type="button"
            className={`  whitespace-pre-wrap h-full !w-full !py-2 !bg-[#29429f] !text-white !rounded-full `}
            size="md"
            appearance="default"
          >
            Other <br />
            Information
          </Button>
        </div>
      </div>

      {tabActive === 1 && <TenantProfileInformation data={data} />}
      {tabActive !== 1 && (
        <TenantEditing
          setTabActive={setTabActive}
          tabActive={tabActive}
          data={data}
          tenantId={data?.tenantId}
          defaultImage={data?.profileImage}
        />
      )}
    </section>
  );
};

export default TenantProfile;
