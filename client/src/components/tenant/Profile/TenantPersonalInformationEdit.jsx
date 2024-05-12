"use client";
import { Controller } from "react-hook-form";
import { DatePicker, Input, MaskedInput, SelectPicker } from "rsuite";
import TenantPersonalProfileUpload from "./TenantPersonalPhotoUpload";
import moment from "moment";
import { booleanSelectPicker } from "@/utils/tenantEditUtils";
import { useState } from "react";

const options = [
  { name: "Social Security Number", mask: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/], placeholder: "XXX-XX-XXXX" },
  {
    name: "US phone number",
    mask: ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    placeholder: "(XXX) XXX-XXXX",
  },
];

const TenantPersonalInformationEdit = ({ control, setFileValue, fileValue, imagePreview, setImagePreview, responseData }) => {
  const [optionSSN] = useState(options[0]);
  const [optionNumber] = useState(options[1]);
  const [keepCharPositions, setKeepCharPositions] = useState(true);
  const [placeholderChar, setPlaceholderChar] = useState("X");
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
          {/* Name Name */}
          <div className="flex w-full items-center gap-5">
            {/* First Name */}
            <div className="w-full">
              <label className="text-sm font-medium">First Name</label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <Input {...field} defaultValue={responseData?.firstName} className="!w-full" type="text" />
                  </div>
                )}
              />
            </div>
            {/* last Name */}
            <div className="w-full">
              <label className="text-sm font-medium">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "Last Name is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <Input className="!w-full" {...field} defaultValue={responseData?.lastName} type="text" />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <div className="w-full">
              <label className="text-sm font-medium">Date of Birth</label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <div className="w-full">
                      <DatePicker
                        {...field}
                        defaultValue={responseData?.dateOfBirth && moment(responseData?.dateOfBirth)?.toDate()}
                        shouldDisableDate={(date) => moment(date).isAfter(moment(), "day")}
                        size="md"
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          {/* Social Security Number */}
          <div className="w-full">
            <label className="text-sm font-medium">Social Security Number</label>
            <Controller
              name="socialSecurityNumber"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <MaskedInput
                    className="!w-full"
                    {...field}
                    defaultValue={responseData?.socialSecurityNumber}
                    mask={optionSSN.mask}
                    guide
                    // showMask
                    keepCharPositions={keepCharPositions}
                    placeholder={optionSSN.placeholder}
                    placeholderChar={placeholderChar}
                  />
                  {/* <Input {...field} defaultValue={responseData?.socialSecurityNumber} className="!w-full" type="text" /> */}
                </div>
              )}
            />
          </div>
          {/* Driver License Number */}
          <div className="w-full">
            <label className="text-sm font-medium">Place to Rent</label>
            <Controller
              name="placeToRent"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input {...field} defaultValue={responseData?.placeToRent} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>
          {/* profile photo  */}
          <div className="w-full">
            <label className="text-sm font-medium">Profile Image</label>
            <div className="mt-1">
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <TenantPersonalProfileUpload
                    setFileValue={setFileValue}
                    fileValue={fileValue}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    field={field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        {/* right ---------------------------------*/}
        <div className="col-span-2 space-y-5">
          {/* Current Address */}
          <div className="w-full">
            <label className="text-sm font-medium">Current Address</label>
            <Controller
              name="presentAddress"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input {...field} defaultValue={responseData?.presentAddress} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <label className="text-sm font-medium">Phone Number</label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <MaskedInput
                    className="!w-full"
                    {...field}
                    defaultValue={responseData?.phoneNumber}
                    mask={optionNumber.mask}
                    guide
                    // showMask
                    keepCharPositions={keepCharPositions}
                    placeholder={optionNumber.placeholder}
                    placeholderChar={"X"}
                  />
                  {/* <Input {...field} defaultValue={responseData?.phoneNumber} className="!w-full" type="text" /> */}
                </div>
              )}
            />
          </div>

          {/* Email Address */}
          {/* <div className="w-full">
            <label className="text-sm font-medium">Email Address</label>
            <Controller
              name="email"
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please provide your valid email",
                },
              }}
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input {...field} defaultValue={responseData?.user?.email} className="!w-full" type="text" />
                </div>
              )}
            />
          </div> */}

          {/* criminal Record */}
          <div>
            <label className="text-sm font-medium">Do you have a criminal record?</label>

            <Controller
              name="isCriminalRecord"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <SelectPicker
                    {...field}
                    searchable={false}
                    defaultValue={String(responseData?.isCriminalRecord)}
                    data={booleanSelectPicker}
                    className="!w-full"
                  />
                </div>
              )}
            />
          </div>
          {/* if yes , describe in details */}
          <div className="w-full">
            <label className="text-sm font-medium">If Yes, Describe it</label>
            <Controller
              name="criminalRecordDescription"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input as="textarea" {...field} defaultValue={responseData?.criminalRecordDescription} rows={6} className="!w-full" />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantPersonalInformationEdit;
