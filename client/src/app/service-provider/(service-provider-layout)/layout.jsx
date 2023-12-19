import ServiceProviderNavbar from "@/components/layouts/serviceProvider/ServiceProviderNavbar";
import ServiceProviderSidebar from "@/components/layouts/serviceProvider/ServiceProviderSidebar";

const PropertyOwnerLayout = ({ children }) => {
  return (
    <section>
      <ServiceProviderNavbar />
      <div className="md:grid md:grid-cols-9 bg-[#f6f7f8]  ">
        <div
          className="max-md:hidden
       md:col-span-3 lg:col-span-2 w-full"
        >
          <ServiceProviderSidebar />
        </div>
        <div className="col-span-6 border lg:col-span-7 ">{children}</div>
      </div>
    </section>
  );
};

export default PropertyOwnerLayout;
