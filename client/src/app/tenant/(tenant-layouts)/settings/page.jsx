"use client";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

const TenantSettings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { data } = useGetPropertyOwnerMyProfileQuery(null);

  const style = "border p-3 rounded-2xl border-[#707070]";

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
              <button
                onClick={handleOpen}
                className="text-[#080808] hover:bg-black/10 p-2 rounded-full font-medium "
              >
                <MdEdit size={25} />
              </button>
            </div>
          </div>
          <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl border-[#707070]">
              Name : {data?.data?.firstName ?? "--"}
              {data?.data?.lastName ?? "-"}
            </h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">
              Email : {data?.data?.user?.email}
            </h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">
              Username : {data?.data?.user?.userName}
            </h3>
            <h3 className="border p-3 rounded-2xl border-[#707070]">
              Password
            </h3>
          </div>
        </div>
        <div className="border-t  border-[#707070] p-5">
          <div>
            <h4 className="text-xl font-medium">Card Information</h4>
          </div>
          <div
            className={`my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8`}
          >
            <h3 className={style}>First Name</h3>
            <h3 className={style}>Last Name</h3>
            <h3 className={style}>Card Number</h3>
            <h3 className={style}>CVV</h3>
            <h3 className={style}>Card Expiration</h3>
          </div>
          <div>
            <button className="text-green-600 font-medium hover:underline">
              Change Card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantSettings;
