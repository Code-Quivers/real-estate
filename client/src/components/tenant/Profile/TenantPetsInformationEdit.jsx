"use client";

import { booleanSelectPicker } from "@/utils/tenantEditUtils";
import { Controller } from "react-hook-form";
import { Input, SelectPicker } from "rsuite";

const TenantPetsInformationEdit = ({ control, responseData }) => {
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
          <div className="w-full">
            <label className="text-sm font-medium">Do you have any pets?</label>
            {/* <Controller
              name="isPets"
              control={control}
              render={({ field }) => (
                <div className="select-none  rs-form-control-wrapper ">
                  <RadioGroup appearance="picker" {...field} inline>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>
                </div>
              )}
            /> */}{" "}
            <Controller
              name="isPets"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <SelectPicker
                    {...field}
                    searchable={false}
                    defaultValue={String(responseData?.isPets)}
                    data={[
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ]}
                    className="!w-full"
                  />
                </div>
              )}
            />
          </div>
          {/* if yes, what type of pets? */}
          <div className="w-full">
            <label className="text-sm font-medium">if yes, what type of pets?</label>
            <Controller
              name="typeOfPets"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} defaultValue={responseData?.typeOfPets} type="text" />
                </div>
              )}
            />
          </div>
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Are you pets up-do-date vaccinations? */}
          <div className="w-full">
            <label className="text-sm font-medium">Are your pets up-do-date vaccinations?</label>
            <Controller
              name="isPetVaccinated"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <SelectPicker
                    {...field}
                    searchable={false}
                    defaultValue={String(responseData?.isPetVaccinated)}
                    data={booleanSelectPicker}
                    className="!w-full"
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

export default TenantPetsInformationEdit;
