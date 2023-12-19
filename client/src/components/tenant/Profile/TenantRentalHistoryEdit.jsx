"use client";

import { Button, Input } from "rsuite";

const TenantRentalHistoryEdit = () => {
  return (
    <div className="mt-10  ">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-lg">Rental History</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left ----------------------------- */}
        <div className="col-span-2 space-y-5">
          {/* previous landlord */}
          <div>
            <label className="text-sm font-medium">
              Previous Landlord Name
            </label>
            <Input placeholder="" type="text" />
          </div>

          {/* Previous landlord contact info */}
          <div>
            <label className="text-sm font-medium">
              Previous landlord contact info
            </label>
            <div className="w-full">
              <Input placeholder="" type="text" />
            </div>
          </div>
          {/* Length of previous tenancy */}
          <div>
            <label className="text-sm font-medium">
              Length of previous tenancy
            </label>
            <Input type="text" />
          </div>
          {/* Rent amount you are willing to pay */}
          <div>
            <label className="text-sm font-medium">
              Rent amount you are willing to pay
            </label>
            <Input type="text" />
          </div>

          {/* next button */}
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Reason for leaving */}

          <div>
            <label className="text-sm font-medium">Reason for leaving</label>
            <Input as="textarea" rows={5} />
          </div>

          {/* Any Eviction or Late Payment */}
          <div>
            <label className="text-sm font-medium">
              Any Eviction or Late Payment
            </label>
            <Input as="textarea" rows={5} />
          </div>
        </div>
      </div>

      <div className=" mt-5 flex justify-end">
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

export default TenantRentalHistoryEdit;
