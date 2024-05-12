"use client";

import moment from "moment";
import { MdEdit } from "react-icons/md";

const TenantProfileInformation = ({ setTabActive, data }) => {
  return (
    <>
      {/* personal information */}
      <div className="border mt-10 rounded-lg shadow-lg">
        <div className="px-5 py-2   flex justify-between items-center">
          <h2 className="text-lg font-medium">Personal Information</h2>
          <button
            onClick={() => setTabActive(2)}
            className="p-2 hover:bg-primary rounded-full hover:text-white text-primary duration-300  hover:border-black/50"
          >
            <MdEdit size={25} />
          </button>
        </div>
        <div className="grid p-5 border-t md:grid-cols-2  gap-5 gap-x-10 ">
          <div className="font-medium">
            <h2 className="text-gray-600">Name</h2>
            <p>
              {data?.firstName} {data?.lastName}
            </p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Current Address</h2>
            <p> {data?.presentAddress ? data?.presentAddress : "N/A"}</p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Date Of Birth</h2>
            <p>{data?.dateOfBirth ? moment(data?.dateOfBirth).format("MMMM Do YYYY") : "N/A"}</p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Phone Number</h2>
            <p>{data?.phoneNumber ? data?.phoneNumber.replace(/\d/g, "X") : "N/A"}</p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Social Security Number</h2>
            <p>{data?.socialSecurityNumber ? "xxx-xx-" + data.socialSecurityNumber.slice(-4) : "N/A"}</p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Email Address</h2>
            <p>{data?.user?.email}</p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Place To Rent</h2>
            <p> {data?.placeToRent ? data?.placeToRent : "N/A"}</p>
          </div>
          <div className="font-medium">
            <h2 className="text-gray-600">Do you have a criminal record?</h2>
            <p>
              {data?.isCriminalRecord === true ? "Yes," : data?.isCriminalRecord === false ? "No" : "N/A"}{" "}
              {data?.criminalRecordDescription ? `(${data?.criminalRecordDescription})` : ""}
            </p>
          </div>
        </div>
      </div>
      {/* Rental History */}
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
        <div className="grid p-5 border-t md:grid-cols-2 gap-5 gap-x-10 font-medium">
          <div>
            <h2 className="text-gray-600">Previous Landlord Name</h2>
            <p>{data?.prevLandlordName ? data?.prevLandlordName : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Previous landlord contact info</h2>
            <p> {data?.prevLandlordContactInfo ? data?.prevLandlordContactInfo : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Length of previous tenancy</h2>
            <p>{data?.lengthOfPrevTenancy ? data?.lengthOfPrevTenancy : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Rent willing to pay (monthly) </h2>
            <p>{data?.affordableRentAmount ? data?.affordableRentAmount : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Reason for leaving</h2>
            <p>{data?.leavingReason ? data?.leavingReason : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Any Eviction or Late Payment</h2>
            <p>{data?.isAnyLatePaymentReason ? data?.isAnyLatePaymentReason : "N/A"}</p>
          </div>
        </div>
      </div>
      {/* Income Information */}
      <div className="border mt-5 rounded-lg shadow-lg">
        <div className="px-5 py-2   flex justify-between items-center">
          <h2 className="text-xl font-medium">Income Information</h2>
          <button
            onClick={() => setTabActive(4)}
            className="p-2  hover:bg-primary rounded-full hover:text-white text-primary duration-300  hover:border-black/50"
          >
            <MdEdit size={25} />
          </button>
        </div>
        <div className="grid p-5 border-t md:grid-cols-2 gap-5 gap-x-10 font-medium">
          <div>
            <h2 className="text-gray-600">Current Employer/Business Name</h2>
            <p>{data?.CurrentEmployerOrBusinessName ? data?.CurrentEmployerOrBusinessName : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Current Employer/Business Contact Info</h2>
            <p> {data?.CurrentEmployerOrBusinessContactInfo ? data?.CurrentEmployerOrBusinessContactInfo : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Job Title</h2>
            <p>{data?.JobTitle ? data?.JobTitle : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Annual Salary</h2>
            <p>{data?.AnnualSalary ? `$ ${parseFloat(data.AnnualSalary).toLocaleString()}` : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Other Source of income</h2>
            <p>{data?.OtherIncomeSource ? data?.OtherIncomeSource : "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600">Current Credit Score</h2>
            <p>{data?.CurrentCreditScore ? data?.CurrentCreditScore : "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantProfileInformation;
