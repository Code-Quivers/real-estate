import ServiceProviderSidebar from "@/components/layouts/ServiceProvider";

const ServiceProviderLayout = ({ children }) => {
  return (
    <div className="md:grid md:grid-cols-9 bg-[#f6f7f8]  ">
      <div
        className="max-md:hidden
       md:col-span-3 lg:col-span-2 w-full"
      >
        <ServiceProviderSidebar />
      </div>
      <div className="col-span-6 border lg:col-span-7 ">{children}</div>
    </div>
  );
};

export default ServiceProviderLayout;
