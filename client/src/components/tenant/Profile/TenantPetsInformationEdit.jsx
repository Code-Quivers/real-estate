"use client";

import { Button, Input } from "rsuite";

const TenantPetsInformationEdit = () => {
  return (
    <div className="mt-10 pb-10">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-lg">Pets</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left ----------------------------- */}
        <div className="col-span-2 space-y-5">
          {/* do you have any pets */}
          <div>
            <label className="text-sm font-medium">Do you have any pets?</label>
            <Input placeholder="" type="text" />
          </div>

          {/* if yes, what type of pets? */}
          <div>
            <label className="text-sm font-medium">
              if yes, what type of pets?
            </label>
            <div className="w-full">
              <Input placeholder="" type="text" />
            </div>
          </div>
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Are you pets up-do-date vaccinations? */}
          <div>
            <label className="text-sm font-medium">
              Are you pets up-do-date vaccinations?
            </label>
            <Input as="textarea" rows={5} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
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

export default TenantPetsInformationEdit;
