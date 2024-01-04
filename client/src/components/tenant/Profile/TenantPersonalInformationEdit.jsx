"use client";

import { Controller } from "react-hook-form";
import { DatePicker, Input } from "rsuite";
import TenantPersonalProfileUpload from "./TenantPersonalPhotoUpload";

const TenantPersonalInformationEdit = ({
  control,
  setFileValue,
  fileValue,
  imagePreview,
  setImagePreview,
}) => {
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
                rules={{
                  required: "First Name is Required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      {...field}
                      placeholder="First Name"
                      className="!w-full"
                      type="text"
                    />
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
                    <Input
                      className="!w-full"
                      {...field}
                      placeholder="Last Name"
                      type="text"
                    />
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
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <div className="w-full">
                      <DatePicker
                        editable={false}
                        {...field}
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
            <label className="text-sm font-medium">
              Social Security Number
            </label>
            <Controller
              name="socialSecurityNumber"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input {...field} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>
          {/* Driver License Number */}
          <div className="w-full">
            <label className="text-sm font-medium">Driver License Number</label>
            <Controller
              name="drivingLicenseNumber"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input {...field} className="!w-full" type="text" />
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
                  <Input {...field} className="!w-full" type="text" />
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
                  <Input {...field} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>

          {/* Email Address */}
          <div className="w-full">
            <label className="text-sm font-medium">Email Address</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input {...field} className="!w-full" type="text" />
                </div>
              )}
            />
          </div>

          {/* criminal Record */}
          <div>
            <label className="text-sm font-medium">
              Do you have a criminal record?
            </label>
            <Input type="text" />
          </div>
          {/* if yes , describe in details */}
          <div className="w-full">
            <label className="text-sm font-medium">If Yes, Describe it</label>
            <Controller
              name="criminalRecordDescription"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input
                    as="textarea"
                    {...field}
                    rows={6}
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

export default TenantPersonalInformationEdit;
