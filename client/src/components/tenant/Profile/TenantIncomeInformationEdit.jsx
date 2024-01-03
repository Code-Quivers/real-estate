"use client";

import { Button, Input } from "rsuite";

const TenantIncomeInformationEdit = () => {
  return (
    <div className="mt-10 pb-10">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-lg">Income Information</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left ----------------------------- */}
        <div className="col-span-2 space-y-5">
          {/* Current Employer/Business Name */}
          <div>
            <label className="text-sm font-medium">
              Current Employer/Business Name
            </label>
            <Input placeholder="" type="text" />
          </div>

          {/* Current Employer/Business Contact Info */}
          <div>
            <label className="text-sm font-medium">
              Current Employer/Business Contact Info
            </label>
            <div className="w-full">
              <Input placeholder="" type="text" />
            </div>
          </div>
          {/* Job Title */}
          <div>
            <label className="text-sm font-medium">Job Title</label>
            <Input type="text" />
          </div>
          {/* Annual Salary */}
          <div>
            <label className="text-sm font-medium">Annual Salary</label>
            <Input type="text" />
          </div>

          {/* next button */}
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Other Source of income*/}
          <div>
            <label className="text-sm font-medium">
              Other Source of income
            </label>
            <Input type="text" />
          </div>

          {/* Current Credit Score */}
          <div>
            <label className="text-sm font-medium">Current Credit Score</label>
            <Input type="text" />
          </div>
        </div>
      </div>

      <div className=" max-lg:mt-5 flex justify-end">
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

export default TenantIncomeInformationEdit;
