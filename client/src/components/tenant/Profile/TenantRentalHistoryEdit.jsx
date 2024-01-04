"use client";

import { Controller } from "react-hook-form";
import { Input, InputNumber } from "rsuite";

const TenantRentalHistoryEdit = ({ control }) => {
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
          {/* previous landlord */}{" "}
          <div className="w-full">
            <label className="text-sm font-medium">
              Previous Landlord Name
            </label>
            <Controller
              name="prevLandlordName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} type="text" />
                </div>
              )}
            />
          </div>
          {/* Previous landlord contact info */}
          <div className="w-full">
            <label className="text-sm font-medium">
              Previous landlord contact info
            </label>
            <Controller
              name="prevLandlordContactInfo"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} type="text" />
                </div>
              )}
            />
          </div>
          {/* Length of previous tenancy */}
          <div className="w-full">
            <label className="text-sm font-medium">
              Length of previous tenancy
            </label>
            <Controller
              name="lengthOfPrevTenancy"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} type="text" />
                </div>
              )}
            />
          </div>
          {/* Rent amount you are willing to pay */}
          <div className="w-full">
            <label className="text-sm font-medium">
              Rent amount you are willing to pay
            </label>
            <Controller
              name="affordableRentAmount"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <InputNumber className="!w-full" {...field} min={0} />
                </div>
              )}
            />
          </div>
          {/* next button */}
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Reason for leaving */}
          <div className="w-full">
            <label className="text-sm font-medium">Reason for leaving</label>
            <Controller
              name="leavingReason"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input
                    as="textarea"
                    className="!w-full"
                    rows={5}
                    {...field}
                    type="text"
                  />
                </div>
              )}
            />
          </div>

          {/* Any Eviction or Late Payment */}
          <div className="w-full">
            <label className="text-sm font-medium">
              Any Eviction or Late Payment
            </label>
            <Controller
              name="isAnyLatePaymentReason"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input
                    as="textarea"
                    className="!w-full"
                    rows={5}
                    {...field}
                    type="text"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRentalHistoryEdit;
