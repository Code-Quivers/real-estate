"use client";
const TenantProfileInformation = ({ data }) => {
  return (
    <div className="grid grid-cols-7 mt-10">
      <div className="col-span-3  space-y-3">
        <div>
          <h2 className="font-semibold text-lg">Name</h2>
          <p className="font-medium">
            {data?.firstName} {data?.lastName}
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Date Of Birth</h2>
          <p className="font-medium">{data?.dateOfBirth ?? "--"}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Social Security Number</h2>
          <p className="font-medium"> {data?.socialSecurityNumber ?? "--"}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Drivers License Number</h2>
          <p className="font-medium"> {data?.drivingLicenseNumber ?? "--"}</p>
        </div>
      </div>
      {/* right items */}
      <div className="col-span-4  space-y-3">
        <div>
          <h2 className="font-semibold text-lg">Current Address</h2>
          <p className="font-medium"> {data?.presentAddress ?? "--"}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Phone Number</h2>
          <p className="font-medium">{data?.phoneNumber ?? "--"}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Email Address</h2>
          <p className="font-medium">{data?.user?.email}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">
            Do you have a criminal record?
          </h2>
          <p className="font-medium">
            {data?.isCriminalRecord === true
              ? "Yes,"
              : data?.isCriminalRecord === false
                ? "No"
                : "--"}{" "}
            {data?.criminalRecordDescription
              ? `(${data?.criminalRecordDescription})`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantProfileInformation;
