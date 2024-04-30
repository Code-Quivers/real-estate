import ServiceProviderLayoutProvider from "@/components/layouts/serviceProvider/ServiceProviderLayoutProviders";
import ServiceProviderSidebar from "@/components/layouts/serviceProvider/ServiceProviderSidebar";
import ServiceProviderSidebarDrawer from "@/components/layouts/serviceProvider/ServiceProviderSidebarDrawer";

const PropertyOwnerLayout = ({ children }) => {
  return (
    <ServiceProviderLayoutProvider>
      <section>
        <div className="md:grid md:grid-cols-9 bg-[#f6f7f8]  ">
          <div
            className="max-md:hidden
       md:col-span-3 lg:col-span-2 w-full"
          >
            <ServiceProviderSidebar />
          </div>
          <div className="col-span-6 border lg:col-span-7 ">
            <div>
              {/* mobile navbar */}
              <div className="md:hidden">
                <ServiceProviderSidebarDrawer />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </section>
    </ServiceProviderLayoutProvider>
  );
};

export default PropertyOwnerLayout;
