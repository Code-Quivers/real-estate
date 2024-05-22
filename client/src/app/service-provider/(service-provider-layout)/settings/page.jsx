"use client";
import ServiceProviderEditModal from "@/components/service-provider/setting/modal/ServiceProviderEditModal";
import { useGetServiceProviderMyProfileQuery } from "@/redux/features/serviceProvider/serviceProviderApi";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

const ServiceProviderSettingPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useGetServiceProviderMyProfileQuery(null);

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-2    2xl:px-0 ">
      <div className="flex justify-center  py-5">
        <h2 className="text-2xl font-semibold ">Settings</h2>
      </div>
      {/*  */}
      <div className="border bg-white shadow-md  rounded-2xl">
        <div className="p-3 md:p-5">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-medium">Profile Information</h4>
            </div>
            <div>
              <button onClick={handleOpen} className="text-[#080808] hover:bg-black/10 p-2 rounded-full font-medium ">
                <MdEdit size={25} />
              </button>
            </div>
          </div>
          <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-5 xl:gap-x-12 gap-y-8">
            <h3 className="border p-3 rounded-2xl">
              Name : {data?.data?.firstName ?? "--"}
              {data?.data?.lastName ?? "-"}
            </h3>
            <h3 className="border p-3 rounded-2xl">Email : {data?.data?.user?.email}</h3>
            <h3 className="border p-3 rounded-2xl">Username : {data?.data?.user?.userName}</h3>
            <h3 className="border p-3 rounded-2xl">Password : ******</h3>
            <h3 className="border p-3 rounded-2xl">Service Type: {data?.data?.Service?.serviceType ?? "N/A"}</h3>
            <h3 className="border p-3 rounded-2xl">Service Availability : {data?.data?.Service?.serviceAvailability ?? "N/A"}</h3>
          </div>
        </div>
      </div>

      {/* profile editing modal */}

      <>
        <ServiceProviderEditModal open={open} myProfileData={data?.data} handleClose={handleClose} />
      </>
    </section>
  );
};

export default ServiceProviderSettingPage;
