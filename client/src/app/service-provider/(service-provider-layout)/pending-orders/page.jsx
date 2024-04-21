import AllPendingOrders from "@/components/service-provider/pendingOrders/AllPendingOrders";

export const metadata = {
  title: "Pending Orders | Service Provider",
};
const ServiceProviderPendingOrders = () => {
  return (
    <section className="max-w-[1050px]  mb-5 mt-5 2xl:mx-auto lg:px-5   px-3 2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-2xl ">Pending Orders</h2>
      </div>
      <div>
        <AllPendingOrders />
      </div>
    </section>
  );
};

export default ServiceProviderPendingOrders;
