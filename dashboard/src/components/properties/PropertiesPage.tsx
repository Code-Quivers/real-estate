"use client";
import { useGetAllPropertiesQuery } from "@/redux/api/features/properties/propertiesApi";
import PropertiesTable from "./PropertiesTable";

const PropertiesPage = () => {
  const { data, isLoading, isFetching } = useGetAllPropertiesQuery({});

  return (
    <div>
      {!isLoading && !isFetching && (
        <PropertiesTable properties={data} queryLoading={isLoading} />
      )}
    </div>
  );
};

export default PropertiesPage;
