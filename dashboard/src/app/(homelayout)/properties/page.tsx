import PropertiesPage from "@/components/properties/PropertiesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties",
};
const Properties = () => {
  return (
    <div>
      <h1 className="mb-3">Properties</h1>
      <PropertiesPage />
    </div>
  );
};

export default Properties;
