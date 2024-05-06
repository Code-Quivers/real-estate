"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import TenantProfileInformation from "@/components/tenant/Profile/TenantProfileInformation";
import TenantEditing from "@/components/tenant/Profile/TenantEditing";
import { useState } from "react";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";
import { fileUrlKey } from "@/configs/envConfig";
import { changeScoreStatus } from "@/utils/scoreStatus";

const TenantProfile = () => {
  const [tabActive, setTabActive] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const { data: dataResponse, isError, isLoading, error } = useGetTenantMyProfileQuery();
  const { data } = dataResponse || {};

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 mt-5 w-full  max-md:mb-5 items-center md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between  lg:mr-10 ">
        <div className="col-span-4 flex   justify-start max-md:gap-2  md:justify-start items-center md:gap-3 ">
          <div className="border shadow-lg rounded-full">
            <Image
              height={150}
              width={150}
              src={data?.profileImage ? `${fileUrlKey()}/${data?.profileImage}` : profileLogo}
              className="max-md:w-[80px] md:w-[150px] md:h-[150px]  rounded-full object-cover select-none"
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
          <div className=" col-span-1 mr-5 flex flex-col-reverse md:flex-col justify-center items-center gap-2 md:gap-4">
            <h5 className="font-medium text-sm md:text-xl">Score</h5>
            <div className={`${changeScoreStatus(data?.scoreRatio?.score)}`}>
              <div className=" flex w-full flex-col justify-center items-center">
                <span className="font-medium">{data?.scoreRatio?.score ?? 0}</span>
                <span className="w-[70%] border-t border-[#b6b6b6]" />
                <span className="font-medium">{data?.scoreRatio?.total ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard */}

      <div className="flex items-center gap-5 p-2 h-11 bg-white rounded-t-lg border mt-4">
        {/* Personal Information */}
        <div className=" ">
          <button
            onClick={() => setTabActive(2)}
            type="button"
            className={`${tabActive == 2 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            Personal information
          </button>
        </div>
        {/* Rental History */}
        <div>
          <button
            onClick={() => setTabActive(3)}
            type="button"
            className={`${tabActive == 3 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            RentalHistory
          </button>
        </div>
        {/* income information */}
        <div>
          <button
            onClick={() => setTabActive(4)}
            type="button"
            className={`${tabActive == 4 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            Income Information
          </button>
        </div>
        {/* pets */}
        <div>
          <button
            onClick={() => setTabActive(5)}
            type="button"
            className={`${tabActive == 5 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            Pets
          </button>
        </div>
        {/* Other Information */}
        <div>
          <button
            onClick={() => setTabActive(6)}
            type="button"
            className={`${tabActive == 6 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            Other Information
          </button>
        </div>
      </div>

      {tabActive === 1 && <TenantProfileInformation setTabActive={setTabActive} data={data} />}
      {tabActive !== 1 && (
        <TenantEditing setTabActive={setTabActive} tabActive={tabActive} data={data} tenantId={data?.tenantId} defaultImage={data?.profileImage} />
      )}
    </section>
  );
};

export default TenantProfile;
