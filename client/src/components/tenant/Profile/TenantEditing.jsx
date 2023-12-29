"use client";
import { useSearchParams } from "next/navigation";
import TenantIncomeInformationEdit from "./TenantIncomeInformationEdit";
import TenantOtherInformationEdit from "./TenantOtherInformationEdit";
import TenantPersonalInformationEdit from "./TenantPersonalInformationEdit";
import TenantPetsInformationEdit from "./TenantPetsInformationEdit";
import TenantRentalHistoryEdit from "./TenantRentalHistoryEdit";

const TenantEditing = () => {
  const paramsName = useSearchParams().get("editing");

  return (
    <div>
      {paramsName === "personal-information" && (
        <TenantPersonalInformationEdit />
      )}
      {paramsName === "rental-history" && <TenantRentalHistoryEdit />}
      {paramsName === "income-information" && <TenantIncomeInformationEdit />}
      {paramsName === "pets-information" && <TenantPetsInformationEdit />}
      {paramsName === "other-information" && <TenantOtherInformationEdit />}
    </div>
  );
};

export default TenantEditing;
