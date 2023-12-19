const TenantProfileInformation = () => {
  return (
    <div className="grid grid-cols-7 mt-10">
      <div className="col-span-3  space-y-3">
        <div>
          <h2 className="font-semibold text-lg">Name</h2>
          <p className="font-medium">Sam Parker</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Date Of Birth</h2>
          <p className="font-medium">09/12/1974</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Social Security Number</h2>
          <p className="font-medium">123-45-6789</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Drivers License Number</h2>
          <p className="font-medium">123 456 789</p>
        </div>
      </div>
      {/* right items */}
      <div className="col-span-4  space-y-3">
        <div>
          <h2 className="font-semibold text-lg">Current Address</h2>
          <p className="font-medium">1040 Waverly Ave NY 0001 USA</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Phone Number</h2>
          <p className="font-medium">123 456 7891</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Email Address</h2>
          <p className="font-medium">samparker112@gmail.com</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">
            Do you have a criminal record?
          </h2>
          <p className="font-medium">yes (Murder)</p>
        </div>
      </div>
    </div>
  );
};

export default TenantProfileInformation;
