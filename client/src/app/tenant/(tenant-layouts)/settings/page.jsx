"use client";

import TenantSettingModalForm from "@/components/tenant/tenantSetting/TenantSettingModalForm";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

const TenantSettings = () => {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { data } = useGetTenantMyProfileQuery(null);

  // const style = "border p-3 rounded-2xl ";

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      <div className="flex justify-center  py-5">
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>
      {/*  */}
      <div className="border bg-white  rounded-2xl">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-medium">Profile Information</h4>
            </div>
            <div>
              <button onClick={() => setOpen(true)} className="text-[#080808] hover:bg-black/10 p-2 rounded-full font-medium ">
                <MdEdit size={25} />
              </button>
            </div>
          </div>
          <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-5 xl:gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl ">
              Name : {data?.data?.firstName ?? "-"} {data?.data?.lastName ?? "-"}
            </h3>
            <h3 className="border p-3 rounded-2xl ">Email : {data?.data?.user?.email}</h3>
            <h3 className="border p-3 rounded-2xl ">Username : {data?.data?.user?.userName}</h3>
            <h3 className="border p-3 rounded-2xl ">Password : ******</h3>
          </div>
        </div>
      </div>

      {/* editing modal */}
      <TenantSettingModalForm handleClose={handleClose} open={open} myProfileData={data?.data} />
    </section>
  );
};

export default TenantSettings;
