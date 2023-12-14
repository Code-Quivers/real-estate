import ServiceProviderNavbar from "@/components/layouts/serviceProvider/ServiceProviderNavbar";
import ServiceProviderSidebar from "@/components/layouts/serviceProvider/ServiceProviderSidebar";

const ServiceProviderLayout = ({ children }) => {
  return (
    <>
      {/* navbar for mobile */}
      <div>
        <ServiceProviderNavbar />
      </div>
      {/* main */}
      <div className="md:grid md:grid-cols-9 bg-[#f6f7f8]  ">
        <div
          className="
       md:col-span-3 lg:col-span-2 w-full"
        >
          <div className="max-md:hidden">
            <ServiceProviderSidebar />
          </div>
        </div>
        <div className="col-span-6 border lg:col-span-7 ">{children}</div>
      </div>
    </>
  );
};

export default ServiceProviderLayout;
