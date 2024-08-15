import TenantsTable from "@/components/tenants/TenantsTable";
import React from "react";

const Tenants = () => {
  return (
    <div>
      <h1 className="text-lg mb-2">Tenant List</h1>
      <TenantsTable />
    </div>
  );
};

export default Tenants;
