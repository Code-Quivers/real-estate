"use client";

import { Controller } from "react-hook-form";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
} from "rsuite";

const TenantOtherInformationEdit = ({ control }) => {
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
          <div className="w-full">
            <label className="text-sm font-medium">Are you a smoker?</label>
            <Controller
              name="isSmoker"
              control={control}
              render={({ field }) => (
                <div className="select-none  rs-form-control-wrapper ">
                  <RadioGroup
                    appearance="default"
                    color="blue"
                    {...field}
                    inline
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>

          {/* Do you have any allergies? */}

          <div className="w-full">
            <label className="text-sm font-medium">
              Do you have any allergies?
            </label>
            <Controller
              name="allergies"
              control={control}
              render={({ field }) => (
                <div className="  rs-form-control-wrapper ">
                  <Input {...field} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>

          {/* Do you have any one living with you? */}
          <div className="w-full">
            <label className="text-sm font-medium">
              Do you have any one living with you?
            </label>
            <Controller
              name="isHaveOtherMember"
              control={control}
              render={({ field }) => (
                <div className="select-none  rs-form-control-wrapper ">
                  <RadioGroup appearance="default" {...field} inline>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>

          {/* If so, how many people? */}
          <div className="w-full">
            <label className="text-sm font-medium">
              If so, how many people?
            </label>
            <Controller
              name="numberOfMember"
              control={control}
              render={({ field }) => (
                <div className="  rs-form-control-wrapper ">
                  <InputNumber {...field} className="!w-full" min={0} />
                </div>
              )}
            />
          </div>
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Are you willing to sign a leasing agreement?*/}
          <div className="w-full">
            <label className="text-sm font-medium">
              Are you willing to sign a leasing agreement?
            </label>
            <Controller
              name="isWillingToSignLeasingAgreement"
              control={control}
              render={({ field }) => (
                <div className="select-none  rs-form-control-wrapper ">
                  <RadioGroup appearance="default" {...field} inline>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>
                </div>
              )}
            />
          </div>

          {/* Any thing extra you want to mention? */}
          <div className="w-full">
            <label className="text-sm font-medium">
              Any thing extra you want to mention?
            </label>
            <Controller
              name="isAnyExtraToMention"
              control={control}
              render={({ field }) => (
                <div className="  rs-form-control-wrapper ">
                  <Input {...field} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantOtherInformationEdit;
