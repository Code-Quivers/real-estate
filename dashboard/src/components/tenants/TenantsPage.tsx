"use client";
import { useGetAllTenantsQuery } from "@/redux/api/features/tenantsApi";
import TenantsTable from "./TenantsTable";

const TenantsPage = () => {
  const { data, isLoading, isFetching } = useGetAllTenantsQuery({});

  const tenantData = data?.data?.data?.map((tenant: any) => {
    return {
      tenantName: `${tenant.firstName} ${tenant.lastName}`,
      password: tenant.password || "password",
      rentAmount: tenant.rentAmount || 0,
      rentPaid: tenant.rentPaid || 0,
    };
  });

  console.log(tenantData, "tenantData");
  return (
    <div>
      {!isLoading && !isFetching && (
        <TenantsTable
          tenantData={tenantData}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default TenantsPage;
