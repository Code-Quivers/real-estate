import TenantsPage from "@/components/tenants/TenantsPage";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Tenants list",
  description: "Tenants",
  keywords: "Tenants",
};
const Tenants = () => {
  return (
    <div>
      <h1 className="text-lg mb-2">Tenant List</h1>
      <TenantsPage />
    </div>
  );
};

export default Tenants;
