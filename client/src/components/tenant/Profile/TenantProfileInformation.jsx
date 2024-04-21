"use client";

import moment from "moment";
import { MdEdit } from "react-icons/md";

const TenantProfileInformation = ({ setTabActive, data }) => {
  return (
    <>
      <div className="border mt-10 shadow-lg">
        <div className="px-5 py-2 bg-[#29439f23]  flex justify-between items-center">
          <h2 className="text-xl font-medium ">Profile Details</h2>

          <button onClick={() => setTabActive(2)} className="p-2  hover:bg-[#29429f] hover:text-white text-[#29429f]  hover:border-black/50">
            <MdEdit size={25} />
          </button>
        </div>
        <div className="grid p-5 border-t grid-cols-2  gap-5 gap-x-10 ">
          <div>
            <h2 className="font-semibold text-lg">Name</h2>
            <p className="font-medium">
              {data?.firstName} {data?.lastName}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Date Of Birth</h2>
            <p className="font-medium">{moment(data?.dateOfBirth).format("MMMM Do YYYY") ?? "--"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Social Security Number</h2>
            <p className="font-medium"> {data?.socialSecurityNumber ?? "--"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Drivers License Number</h2>
            <p className="font-medium"> {data?.drivingLicenseNumber ?? "--"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Current Address</h2>
            <p className="font-medium"> {data?.presentAddress ?? "--"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Phone Number</h2>
            <p className="font-medium">{data?.phoneNumber ?? "--"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Email Address</h2>
            <p className="font-medium">{data?.user?.email}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Do you have a criminal record?</h2>
            <p className="font-medium">
              {data?.isCriminalRecord === true ? "Yes," : data?.isCriminalRecord === false ? "No" : "--"}{" "}
              {data?.criminalRecordDescription ? `(${data?.criminalRecordDescription})` : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantProfileInformation;
