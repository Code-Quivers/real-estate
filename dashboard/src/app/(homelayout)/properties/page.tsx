import PropertiesTable from "@/components/properties/PropertiesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties",
};
const Properties = () => {
  return (
    <div>
      <h1 className="mb-3">Properties</h1>
      <PropertiesTable />
    </div>
  );
};

export default Properties;
