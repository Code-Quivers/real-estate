"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
const AvailableUnitListPopover = ({ singleUnit }) => {
  const handleAddTenantToProperty = (propertyId) => {
    console.log(propertyId);
  };
  return (
    <div
      onClick={() => handleAddTenantToProperty(singleUnit?.propertyId)}
      className="flex  gap-3 border rounded-lg hover:border-primary hover:cursor-pointer duration-300 transition-all"
    >
      <div>
        <Image
          width={60}
          height={60}
          className="w-[90px]  p-1 object-cover rounded-xl"
          src={singleUnit?.images?.length ? `${fileUrlKey()}/${singleUnit?.images[0]}` : profileLogo}
          alt="photo"
        />
      </div>
      <div className="flex flex-col justify-around text-[14px] font-medium">
        <h3>${singleUnit?.monthlyRent}</h3>
        <h3>
          {singleUnit?.numOfBed} Beds {singleUnit?.numOfBath} Bath
        </h3>
        <h3>{singleUnit?.address}</h3>
      </div>
    </div>
  );
};

export default AvailableUnitListPopover;
