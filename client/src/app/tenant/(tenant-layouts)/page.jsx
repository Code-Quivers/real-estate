"use client";

import TenantProfileInformation from "@/components/tenant/Profile/TenantProfileInformation";
import TenantEditing from "@/components/tenant/Profile/TenantEditing";
import { useState } from "react";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";
import { fileUrlKey } from "@/configs/envConfig";
import Score from "@/components/Shared/Score/Score";
import { Avatar } from "rsuite";

const TenantProfile = () => {
  const [tabActive, setTabActive] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const { data: dataResponse, isError, isLoading, error } = useGetTenantMyProfileQuery();
  const { data } = dataResponse || {};

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      {/* profile Information */}
      <div className="grid grid-cols-5 mt-5 w-full max-md:mb-5 items-start md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between  lg:mr-10 ">
        <div className="col-span-4 flex max-md:flex-col justify-start max-md:gap-2 md:justify-start md:items-center md:gap-3">
          <div>
            <Avatar circle size="xl" src={data?.profileImage && `${fileUrlKey()}/${data?.profileImage}`} />
          </div>
          <div>
            <h4 className="text-lg font-medium">
              {data?.firstName} {data?.lastName}
            </h4>
            <h4 className="text-lg font-medium"> {data?.user?.email} </h4>
            <h4 className="text-lg font-medium">Phone Number : {data?.phoneNumber ?? "N/A"}</h4>
          </div>
        </div>
        {/* score */}

        <div>
          <div className="col-span-1 mr-5 flex flex-col-reverse md:flex-col justify-center items-center gap-2 md:gap-4">
            <h5 className="font-medium text-sm md:text-xl">Score</h5>
            <div>
              <Score isLoading={isLoading} score={data?.scoreRatio?.score} total={data?.scoreRatio?.total} />
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard */}
      <div>
        <select
          name=""
          id=""
          className="w-full sm:hidden rounded-md p-3 border shadow bg-white"
          onChange={(e) => setTabActive(parseInt(e.target.value))}
          value={tabActive}
        >
          <option value={2}>Personal information</option>
          <option value={3}>Rental history</option>
          <option value={4}>Income Information</option>
          <option value={5}>Pets</option>
          <option value={6}>Other Information</option>
        </select>
      </div>
      <div className="max-sm:hidden flex items-center gap-5 p-2 h-11 bg-white rounded-t-lg border mt-4">
        {/* Personal Information */}
        <div className=" ">
          <button
            onClick={() => setTabActive(2)}
            type="button"
            className={`${tabActive == 2 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} lg:px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            <span className="max-lg:hidden">Personal information</span>
            <span className="lg:hidden">Personal</span>
          </button>
        </div>
        {/* Rental History */}
        <div>
          <button
            onClick={() => setTabActive(3)}
            type="button"
            className={`${tabActive == 3 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} lg:px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            Rental history
          </button>
        </div>
        {/* income information */}
        <div>
          <button
            onClick={() => setTabActive(4)}
            type="button"
            className={`${tabActive == 4 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} lg:px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            <span className="max-lg:hidden">Income Information</span>
            <span className="lg:hidden">Income</span>
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
            className={`${tabActive == 6 && "!text-primary border-b-2 pb-2.5 pt-2.5 !border-b-primary font-semibold"} lg:px-2 border-b-2 border-b-white text-gray-600 font-semibold`}
          >
            <span className="max-lg:hidden">Other Information</span>
            <span className="lg:hidden">Other</span>
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
