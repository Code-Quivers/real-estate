import PropertyOwnerSidebar from "@/components/layouts/PropertyOwnerSidebar";
import PropertyOwnerDrawer from "@/components/layouts/propertyOwner/PropertyOwnerDrawer";
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
        <div className="col-span-6   lg:col-span-7 ">
          <div>
            {/* mobile navbar */}
            <div className="md:hidden">
              <PropertyOwnerDrawer />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </PropertyOwnerProvider>
  );
};

export default PropertyOwnerLayout;
