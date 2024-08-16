"use client";
import { useGetAllTenantsQuery } from "@/redux/api/features/tenantsApi";
import TenantsTable from "./TenantsTable";

const TenantsPage = () => {
       const { data } = useGetAllTenantsQuery({});
    console.log(data, "datatatatat");
  return (
    <div>
      <TenantsTable />
    </div>
  );
};

export default TenantsPage;
