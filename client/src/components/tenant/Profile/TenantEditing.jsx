/* eslint-disable no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import TenantIncomeInformationEdit from "./TenantIncomeInformationEdit";
import TenantOtherInformationEdit from "./TenantOtherInformationEdit";
import TenantPersonalInformationEdit from "./TenantPersonalInformationEdit";
import TenantPetsInformationEdit from "./TenantPetsInformationEdit";
import TenantRentalHistoryEdit from "./TenantRentalHistoryEdit";
import { Button } from "rsuite";
import { useState } from "react";
import { fileUrlKey } from "@/configs/envConfig";
import { useUpdateTenantProfileMutation } from "@/redux/features/tenant/tenantsApi";
import { convertToBoolean, convertToNumber } from "@/utils/tenantEditUtils";

const TenantEditing = ({ setTabActive, tabActive, defaultImage, tenantId, data: responseData }) => {
  const [fileValue, setFileValue] = useState([]);
  const [imagePreview, setImagePreview] = useState(fileValue?.length ? null : defaultImage ? `${fileUrlKey()}/${defaultImage}` : null);
  const [updateTenantProfile, { isError, isLoading, isSuccess, error }] = useUpdateTenantProfileMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleUpdateTenant = async (updateData) => {
    const {
      numberOfMember,
      dateOfBirth,
      isCriminalRecord,
      affordableRentAmount,
      AnnualSalary,
      CurrentCreditScore,
      isPets,
      isPetVaccinated,
      isHaveOtherMember,
      isSmoker,
      isWillingToSignLeasingAgreement,
      ...allData
    } = updateData;

    const obj = {
      ...allData,
      numberOfMember: numberOfMember !== undefined ? convertToNumber(numberOfMember) : undefined,
      dateOfBirth: dateOfBirth !== undefined ? dateOfBirth?.toISOString() : undefined,
      affordableRentAmount: affordableRentAmount !== undefined ? convertToNumber(affordableRentAmount) : undefined,
      AnnualSalary: AnnualSalary !== undefined ? convertToNumber(AnnualSalary) : undefined,
      CurrentCreditScore: CurrentCreditScore !== undefined ? convertToNumber(CurrentCreditScore) : undefined,
      isCriminalRecord: isCriminalRecord !== undefined ? convertToBoolean(isCriminalRecord) : undefined,
      isPets: isPets !== undefined ? convertToBoolean(isPets) : undefined,
      isPetVaccinated: isPetVaccinated !== undefined ? convertToBoolean(isPetVaccinated) : undefined,
      isHaveOtherMember: isHaveOtherMember !== undefined ? convertToBoolean(isHaveOtherMember) : undefined,
      isSmoker: isSmoker !== undefined ? convertToBoolean(isSmoker) : undefined,
      isWillingToSignLeasingAgreement: isWillingToSignLeasingAgreement !== undefined ? convertToBoolean(isWillingToSignLeasingAgreement) : undefined,
    };

    // creating form data
    const formData = new FormData();

    // deleting file from obj
    delete obj.file;
    const updatedProfileData = JSON.stringify(obj);
    if (updateData?.file?.blobFile) obj["oldFilePath"] = defaultImage;
    if (updateData?.file?.blobFile) formData.append("file", updateData?.file?.blobFile);
    formData.append("data", updatedProfileData);

    const res = await updateTenantProfile({
      tenantId,
      data: formData,
    });

    if (res?.data?.success === true) setTabActive(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateTenant)}>
        {tabActive === 2 && (
          <TenantPersonalInformationEdit
            setFileValue={setFileValue}
            fileValue={fileValue}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            control={control}
            responseData={responseData}
          />
        )}
        {tabActive === 3 && <TenantRentalHistoryEdit responseData={responseData} control={control} />}
        {tabActive === 4 && <TenantIncomeInformationEdit errors={errors} responseData={responseData} control={control} />}
        {tabActive === 5 && <TenantPetsInformationEdit responseData={responseData} control={control} />}
        {tabActive === 6 && <TenantOtherInformationEdit responseData={responseData} control={control} />}

        <div className="my-10">
          <div className=" flex justify-end gap-5 items-center">
            {tabActive === 2 && (
              <Button
                type="button"
                onClick={() => setTabActive(1)}
                size="lg"
                className="!bg-[#29429f]  hover:!bg-gray-800 !px-12 !rounded-2xl !py-4 !text-white"
              >
                CANCEL
              </Button>
            )}
            {tabActive >= 3 && tabActive <= 6 && (
              <Button
                type="button"
                onClick={() => setTabActive(tabActive - 1)}
                size="lg"
                className="!bg-[#29429f]  hover:!bg-gray-800 !px-12 !rounded-2xl !py-4 !text-white"
              >
                BACK
              </Button>
            )}
            {tabActive >= 2 && tabActive <= 5 && (
              <Button
                type="button"
                onClick={() => setTabActive(tabActive + 1)}
                size="lg"
                className="!bg-[#29429f] !px-12 !rounded-2xl !py-4 !text-white"
              >
                Next
              </Button>
            )}
            {tabActive === 6 && (
              <Button size="lg" type="submit" className="!bg-[#29429f] !px-12 !rounded-2xl !py-4 !text-white">
                SAVE
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TenantEditing;
