"use client";

import requestApartment from "@/assets/propertyOwner/requestApartment.jpg";
import PendingOrderActions from "@/components/service-provider/pendingOrders/PendingOrderActions";
import { useGetMyPendingOrdersQuery } from "@/redux/features/pendingOrder/pendingOrderApi";
import Image from "next/image";

const AllPendingOrders = () => {
  const allRequest = [
    {
      homeAddressName: "homeAddressName",
      homeOwnerAddress: "homeOwnerAddress",
      PriorityType: "PriorityType",
      image: requestApartment,
    },
    {
      homeAddressName: "homeAddressName",
      homeOwnerAddress: "homeOwnerAddress",
      PriorityType: "PriorityType",
      image: requestApartment,
    },
    {
      homeAddressName: "homeAddressName",
      homeOwnerAddress: "homeOwnerAddress",
      PriorityType: "PriorityType",
      image: requestApartment,
    },
  ];

  // !
  const { data } = useGetMyPendingOrdersQuery();

  return (
    <div>
      {/* requests */}
      <div className="mt-5 grid grid-cols-1 gap-5">
        {allRequest?.map((singleReq) => (
          <div className="border lg:flex  shadow-lg border-[#acacac]   lg:gap-3 xl:gap-6 " key={Math.random()}>
            <div className="border max-md:w-full  border-[#acacac]">
              <Image
                className="w-full md:w-full lg:w-[300px] xl:w-[500px] h-full lg:h-[180px] object-cover object-left"
                src={singleReq.image}
                alt="photo"
              />
            </div>
            <div className="p-3 lg:p-3 flex  max-lg:flex-col justify-between w-full   lg:gap-2">
              <div className="space-y-3  ">
                <h3 className="text-xl font-medium">{singleReq.homeAddressName}</h3>
                <h3 className="text-xl font-medium">{singleReq.homeOwnerAddress}</h3>
                <h3 className="text-xl font-medium">{singleReq.PriorityType}</h3>
              </div>
              <div className="mt-3">
                <PendingOrderActions />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPendingOrders;
