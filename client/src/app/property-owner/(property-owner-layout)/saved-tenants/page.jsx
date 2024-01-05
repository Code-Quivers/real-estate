"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/saveTenantApi";
import { useDebounced } from "@/redux/hook";
import Image from "next/image";
import { useState } from "react";

const PropertyOwnerSavedTenants = () => {
  const query = {};

  const [itemType, setItemType] = useState("TENANT");

  query["itemType"] = itemType;

  const { data } = useGetAllSavedItemsQuery({ ...query });

  console.log("data", data);

  return (
    <>
      <section className="max-w-[1050px]  mb-5 mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl font-medium">Saved Tenants</h2>
        </div>
        {/* saved tenants */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {data?.data?.data?.map((singleReq) => (
            <div
              className=" col-span-1  border flex justify-between items-center px-5 border-[#acacac]  gap-2"
              key={Math.random()}
            >
              <div>
                <Image
                  className="w-[80px] h-[65px] object-cover object-left  rounded-full  "
                  src={singleReq.image}
                  alt="photo"
                />
              </div>
              <div className="p-5 flex justify-between w-full ">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">
                    <span>{singleReq?.tenant?.firstName}</span>{" "}
                    <span>{singleReq?.tenant?.lastName}</span>
                  </h3>
                  <h3 className="text-lg font-medium">
                    {singleReq.placeToRent}
                  </h3>
                  <h3 className="text-lg font-medium">
                    {singleReq.tenant?.affordableRentAmount}
                  </h3>
                </div>
              </div>
              <div className=" outline outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[70px] h-[50px]">
                <div className=" flex w-full flex-col justify-center items-center">
                  <span>9</span>
                  <span className="w-[70%] border-t border-[#b6b6b6]" />
                  <span>10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PropertyOwnerSavedTenants;
