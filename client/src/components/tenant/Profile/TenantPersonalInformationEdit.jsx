"use client";

import { Button, DatePicker, Input, InputNumber } from "rsuite";

const TenantPersonalInformationEdit = () => {
  return (
    <div className="mt-10 pb-10">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-lg">Profile Information</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left --------------- */}
        <div className="col-span-2 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Name" type="text" />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium">Date of Birth</label>
            <div className="w-full">
              <DatePicker size="md" className="w-full" />
            </div>
          </div>
          {/* Social Security Number */}
          <div>
            <label className="text-sm font-medium">
              Social Security Number
            </label>
            <Input type="text" />
          </div>
          {/* Driver License Number */}
          <div>
            <label className="text-sm font-medium">Driver License Number</label>
            <Input type="text" />
          </div>

          {/* next button */}
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Current Address */}

          <div>
            <label className="text-sm font-medium">Current Address</label>
            <Input type="text" />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <InputNumber min={0} />
          </div>
          {/* Email Address */}
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <Input type="text" />
          </div>
          {/* criminal Record */}
          <div>
            <label className="text-sm font-medium">
              Do you have a criminal record?
            </label>
            <Input type="text" />
          </div>
          {/* if yes , describe in details */}
          <div>
            <label className="text-sm font-medium">If Yes, Describe it</label>
            <Input as="textarea" rows={6} />
          </div>
        </div>
      </div>

      <div className=" mt-5 flex justify-start">
        <Button
          size="lg"
          className="!bg-[#29429f] !px-12 !rounded-2xl !py-4 !text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TenantPersonalInformationEdit;
