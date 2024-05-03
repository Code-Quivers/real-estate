"use client";

import moment from "moment";
import { MdEdit } from "react-icons/md";

const TenantProfileInformation = ({ setTabActive, data }) => {
  return (
    <>
      {/* personal information */}
      <div className="border mt-10 rounded-lg shadow-lg">
        <div className="px-5 py-2   flex justify-between items-center">
          <h2 className="text-xl font-medium">Personal Information</h2>
          <button
            onClick={() => setTabActive(2)}
            className="p-2  hover:bg-primary rounded-full hover:text-white text-primary duration-300  hover:border-black/50"
          >
            <MdEdit size={25} />
          </button>
        </div>
        <div className="grid p-5 border-t md:grid-cols-2  gap-5 gap-x-10 ">
          <div>
            <h2 className="font-semibold text-lg">Name</h2>
            <p className="font-medium">
              {data?.firstName} {data?.lastName}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Current Address</h2>
            <p className="font-medium"> {data?.presentAddress ?? "-"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Date Of Birth</h2>
            <p className="font-medium">{data?.dateOfBirth ? moment(data?.dateOfBirth).format("MMMM Do YYYY") : "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Phone Number</h2>
            <p className="font-medium">{data?.phoneNumber ?? "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Social Security Number</h2>
            <p className="font-medium"> {data?.socialSecurityNumber ?? "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Email Address</h2>
            <p className="font-medium">{data?.user?.email}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Drivers License Number</h2>
            <p className="font-medium"> {data?.drivingLicenseNumber ?? "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Do you have a criminal record?</h2>
            <p className="font-medium">
              {data?.isCriminalRecord === true ? "Yes," : data?.isCriminalRecord === false ? "No" : "-"}{" "}
              {data?.criminalRecordDescription ? `(${data?.criminalRecordDescription})` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="border mt-5 rounded-lg shadow-lg">
        <div className="px-5 py-2   flex justify-between items-center">
          <h2 className="text-xl font-medium">Rental History</h2>
          <button
            onClick={() => setTabActive(3)}
            className="p-2  hover:bg-primary rounded-full hover:text-white text-primary duration-300  hover:border-black/50"
          >
            <MdEdit size={25} />
          </button>
        </div>
        <div className="grid p-5 border-t md:grid-cols-2  gap-5 gap-x-10 ">
          <div>
            <h2 className="font-semibold text-lg">Previous Landlord Name</h2>
            <p className="font-medium">{data?.prevLandlordName ?? "-"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Previous landlord contact info</h2>
            <p className="font-medium"> {data?.prevLandlordContactInfo ?? "-"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Length of previous tenancy</h2>
            <p className="font-medium">{data?.lengthOfPrevTenancy ?? "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Rent I am Willing to pay (monthly) </h2>
            <p className="font-medium">{data?.affordableRentAmount ?? "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Social Security Number</h2>
            <p className="font-medium"> {data?.socialSecurityNumber ?? "-"}</p>
          </div>{" "}
          <div>
            <h2 className="font-semibold text-lg">Reason for leaving</h2>
            <p className="font-medium">{data?.leavingReason ?? "-"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Any Eviction or Late Payment</h2>
            <p className="font-medium"> {data?.isAnyLatePaymentReason ?? "-"}</p>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default TenantProfileInformation;
