"use client";

import { Controller } from "react-hook-form";
import { Form, Input, InputNumber, MaskedInput } from "rsuite";

const TenantIncomeInformationEdit = ({ control, responseData, errors }) => {
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
          <div className="w-full">
            <label className="text-sm font-medium">Current Employer/Business Name</label>
            <Controller
              name="CurrentEmployerOrBusinessName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} defaultValue={responseData?.CurrentEmployerOrBusinessName} type="text" />
                </div>
              )}
            />
          </div>
          {/* Current Employer/Business Contact Info */}
          <div className="w-full">
            <label className="text-sm font-medium">Current Employer/Business Contact Info</label>
            <Controller
              name="CurrentEmployerOrBusinessContactInfo"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} defaultValue={responseData?.CurrentEmployerOrBusinessContactInfo} type="text" />
                </div>
              )}
            />
          </div>
          {/* Job Title */}
          <div className="w-full">
            <label className="text-sm font-medium">Job Title</label>
            <Controller
              name="JobTitle"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} defaultValue={responseData?.JobTitle} type="text" />
                </div>
              )}
            />
          </div>
          {/* Annual Salary */}
          <div className="w-full">
            <label className="text-sm font-medium">Annual Salary</label>
            <Controller
              name="AnnualSalary"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <InputNumber
                    className="!w-full"
                    prefix="$"
                    {...field}
                    defaultValue={responseData?.AnnualSalary}
                    min={0}
                    formatter={(value) => {
                      if (!isNaN(value)) {
                        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                      }
                      return "";
                    }}
                    parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                  />
                </div>
              )}
            />
          </div>

          {/* next button */}
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Other Source of income*/}{" "}
          <div className="w-full">
            <label className="text-sm font-medium">Other Source of income</label>
            <Controller
              name="OtherIncomeSource"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input className="!w-full" {...field} defaultValue={responseData?.OtherIncomeSource} type="text" />
                </div>
              )}
            />
          </div>
          {/* Current Credit Score */}{" "}
          <div className="w-full">
            <label className="text-sm font-medium">Current Credit Score</label>
            <Controller
              name="CurrentCreditScore"
              control={control}
              defaultValue={responseData?.CurrentCreditScore}
              rules={{
                min: {
                  value: 100,
                  message: "Minimum Credit Score is 100",
                },
                max: {
                  value: 850,
                  message: "Maximum Credit Score is 850",
                },
                pattern: {
                  value: /[1-8]\d{2}/,
                  message: "Credit Score should not be more than 850",
                },
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <MaskedInput
                    className="!w-full"
                    {...field}
                    defaultValue={responseData?.CurrentCreditScore}
                    // mask={[/[1-8]/, /\d/, /\d/]}
                    guide
                    mask={[
                      /[1-8]/, // First digit 1-8
                      field.value?.[0] === "8" ? /[0-5]/ : /\d/, // Second digit based on the first digit
                      field.value?.[0] === "8" && field.value?.[1] === "5" ? /[0]/ : /\d/, // Third digit based on the first two digits
                    ]}
                    // showMask
                    keepCharPositions
                    placeholder={"XXX"}
                    placeholderChar={"X"}
                  />
                  <Form.ErrorMessage show={!!errors?.CurrentCreditScore} placement="topEnd">
                    {errors?.CurrentCreditScore?.message}
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantIncomeInformationEdit;
