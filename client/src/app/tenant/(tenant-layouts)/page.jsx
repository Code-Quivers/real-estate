"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";

import { useSearchParams } from "next/navigation";
import TenantProfileButton from "@/components/tenant/Profile/TenantProfileButton";
import TenantProfileInformation from "@/components/tenant/Profile/TenantProfileInformation";
import TenantPersonalInformationEdit from "@/components/tenant/Profile/TenantPersonalInformationEdit";
import TenantRentalHistoryEdit from "@/components/tenant/Profile/TenantRentalHistoryEdit";
import TenantIncomeInformationEdit from "@/components/tenant/Profile/TenantIncomeInformationEdit";
import TenantPetsInformationEdit from "@/components/tenant/Profile/TenantPetsInformationEdit";
import TenantOtherInformationEdit from "@/components/tenant/Profile/TenantOtherInformationEdit";

const TenantProfile = () => {
  const paramsName = useSearchParams().get("editing");

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
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
      <div className="mt-10 grid grid-cols-3 lg:grid-cols-5 w-full lg:mt-8 items-stretch gap-2 lg:gap-5">
        {/* Personal Information */}
        <div className=" ">
          <TenantProfileButton
            firstTitle="Personal"
            secondTitle="Information"
            href="/tenant?editing=personal-information"
          />
        </div>
        {/* Rental History */}
        <div>
          <TenantProfileButton
            firstTitle="Rental"
            secondTitle="History"
            href="/tenant?editing=rental-history"
          />
        </div>
        {/* income information */}
        <div>
          <TenantProfileButton
            firstTitle="Income"
            secondTitle="Information"
            href="/tenant?editing=income-information"
          />
        </div>
        {/* pets */}
        <div>
          <TenantProfileButton
            firstTitle="Pets"
            href="/tenant?editing=pets-information"
          />
        </div>
        {/* Other Information */}
        <div>
          <TenantProfileButton
            firstTitle="Other"
            secondTitle="Information"
            href="/tenant?editing=other-information"
          />
        </div>
      </div>

      {paramsName === null ||
      ![
        "personal-information",
        "rental-history",
        "income-information",
        "pets-information",
        "other-information",
      ].includes(paramsName) ? (
        <TenantProfileInformation />
      ) : (
        <>
          {paramsName === "personal-information" && (
            <TenantPersonalInformationEdit />
          )}
          {paramsName === "rental-history" && <TenantRentalHistoryEdit />}
          {paramsName === "income-information" && (
            <TenantIncomeInformationEdit />
          )}
          {paramsName === "pets-information" && <TenantPetsInformationEdit />}
          {paramsName === "other-information" && <TenantOtherInformationEdit />}
        </>
      )}
    </section>
  );
};

export default TenantProfile;
