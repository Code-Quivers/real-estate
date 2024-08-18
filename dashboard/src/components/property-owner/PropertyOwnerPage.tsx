"use client";

import { useGetAllPropertyOwnerQuery } from "@/redux/api/features/propertyOwnerApi";
import PropertyOwnerTable from "./PropertyOwnerTable";

const PropertyOwnerPage = () => {
  const { data, isLoading, isFetching } = useGetAllPropertyOwnerQuery({});
  return (
    <div>
      {!isLoading && !isFetching && (
        <PropertyOwnerTable propertyOwners={data?.data} />
      )}
    </div>
  );
};

export default PropertyOwnerPage;
