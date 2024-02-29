"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
const AvailableUnitListPopover = ({ singleUnit, tenantId }) => {
  const handleAddTenantToProperty = (propertyId) => {
    console.log(propertyId);
    console.log(tenantId);
  };
  return (
    <button
      onClick={() => handleAddTenantToProperty(singleUnit?.propertyId)}
      className="flex  w-full gap-3 border rounded-lg hover:border-primary  duration-300 transition-all text-start"
    >
      <div>
        <Image
          width={120}
          height={120}
          className="w-[120px]  p-1 object-cover rounded-xl"
          src={singleUnit?.images?.length ? `${fileUrlKey()}/${singleUnit?.images[0]}` : profileLogo}
          alt="photo"
        />
      </div>
      <div className="flex w-full flex-col justify-between my-2 text-[14px] font-medium">
        <h3>${singleUnit?.monthlyRent}</h3>
        <h3>
          {singleUnit?.numOfBed} Beds {singleUnit?.numOfBath} Bath
        </h3>
        <h3>{singleUnit?.address}</h3>
      </div>
    </button>
  );
};

export default AvailableUnitListPopover;
