import PropertyOwnerSidebar from "@/components/layouts/PropertyOwnerSidebar";

const PropertyOwnerLayout = ({ children }) => {
  return (
    <div className="flex gap-6">
      <PropertyOwnerSidebar />
      <div>{children}</div>
    </div>
  );
};

export default PropertyOwnerLayout;
