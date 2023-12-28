"use client";

import { Button, Input } from "rsuite";

const ServiceProviderProfileInformationEdit = () => {
  return (
    <div className="mt-6">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Profile Information</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left */}
        <div className="col-span-2 space-y-5">
          <div className="space-y-1">
            <label className=" font-medium text-lg">Company Name</label>
            <Input type="text" />
          </div>
          <div className="space-y-1">
            <label className="text-lg font-medium">Company Address</label>
            <Input type="text" />
          </div>
        </div>
        {/* right */}
        <div className="col-span-2 space-y-5">
          <div className="space-y-1">
            <label className="text-lg font-medium">Company Phone Number</label>
            <Input type="text" />
          </div>
          <div className="space-y-1">
            <label className="text-lg font-medium">Company Email Address</label>
            <Input type="text" />
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default ServiceProviderProfileInformationEdit;
