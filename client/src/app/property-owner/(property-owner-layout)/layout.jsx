import PropertyOwnerSidebar from "@/components/layouts/PropertyOwnerSidebar";
import PropertyOwnerProvider from "@/components/layouts/propertyOwner/PropertyOwnerProvider";

const PropertyOwnerLayout = ({ children }) => {
  return (
    <PropertyOwnerProvider>
      <div className="md:grid md:grid-cols-9 bg-[#f6f7f8]  ">
        <div
          className="max-md:hidden
       md:col-span-3 lg:col-span-2 w-full"
        >
          <PropertyOwnerSidebar />
        </div>
        <div className="col-span-6 border lg:col-span-7 ">{children}</div>
      </div>
    </PropertyOwnerProvider>
  );
};

export default PropertyOwnerLayout;
