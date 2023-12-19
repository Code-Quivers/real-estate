"use client";

import { Button, Input } from "rsuite";

const TenantOtherInformationEdit = () => {
  return (
    <div className="mt-10 pb-10">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-lg">Other Information</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left ----------------------------- */}
        <div className="col-span-2 space-y-5">
          {/* Are you a smoker? */}
          <div>
            <label className="text-sm font-medium">Are you a smoker?</label>
            <Input placeholder="" type="text" />
          </div>

          {/* Do you have any allergies? */}
          <div>
            <label className="text-sm font-medium">
              Do you have any allergies?
            </label>
            <div className="w-full">
              <Input placeholder="" type="text" />
            </div>
          </div>
          {/* Do you have any one living with you? */}
          <div>
            <label className="text-sm font-medium">
              Do you have any one living with you?
            </label>
            <Input type="text" />
          </div>
          {/* If so, how many people? */}
          <div>
            <label className="text-sm font-medium">
              If so, how many people?
            </label>
            <Input type="text" />
          </div>

          {/* next button */}
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Are you willing to sign a leasing agreement?*/}
          <div>
            <label className="text-sm font-medium">
              Are you willing to sign a leasing agreement?
            </label>
            <Input type="text" />
          </div>

          {/* Any thing extra you want to mention? */}
          <div>
            <label className="text-sm font-medium">
              Any thing extra you want to mention?
            </label>
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

export default TenantOtherInformationEdit;
