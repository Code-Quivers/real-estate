"use client";
import PropertyOwnerProfileEditModal from "@/components/property-owner/profile/PropertyOwnerProfileEditModal";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

const PropertyOwnerSettingPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useGetPropertyOwnerMyProfileQuery(null);

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      <div className="flex justify-center  py-5">
        <h2 className="text-2xl font-semibold ">Settings</h2>
      </div>
      {/*  */}
      <div className="border border-[#707070] rounded-2xl">
        <div className="p-5">
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
          <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl border-[#707070]">
              Name : {data?.data?.firstName ?? "--"}
              {data?.data?.lastName ?? "-"}
            </h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">Email : {data?.data?.user?.email}</h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">Username : {data?.data?.user?.userName}</h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">Password</h3>
          </div>
        </div>
        <div className="border-t  border-[#707070] p-5">
          <div>
            <h4 className="text-xl font-medium">Card Information</h4>
          </div>
          <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl border-[#707070]">First Name</h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">Last Name</h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">Card Number</h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">CVV</h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">Card Expiration</h3>
          </div>
          <div>
            <button className="text-green-600 font-medium hover:underline">Change Card</button>
          </div>
        </div>
        {/* current plan */}
        <div className="border-t border-[#707070] p-5">
          <div>
            <h4 className="text-xl font-medium">Current Plan</h4>
          </div>
          <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl border-[#707070]">Monthly Plan - 99$/month</h3>
          </div>
          <div>
            <button className="text-green-600 font-medium hover:underline">Change Plan</button>
          </div>
        </div>
      </div>

      {/* profile editing modal */}

      <>
        <PropertyOwnerProfileEditModal open={open} myProfileData={data?.data} handleClose={handleClose} />
      </>
    </section>
  );
};

export default PropertyOwnerSettingPage;
