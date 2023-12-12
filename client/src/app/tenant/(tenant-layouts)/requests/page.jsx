import Image from "next/image";
import React from "react";
import requestImage from "@/assets/tenant/AustralianHousing-scaled.webp";
import PrimaryButtonForTenant from "@/components/tenant/PrimaryButtonForTenant";

const page = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl mb-5">Requests you sent</h2>
      <div className="flex justify-between items-center border">
        <div className="flex justify-start items-center gap-5">
          <Image
            src={requestImage}
            className="h-32 object-cover"
            width={150}
            objectFit="cover"
            alt="Tenant avialable units"
          />
          <div className="text-start">
            <h2>Home Owner Name</h2>
            <h2>Home Owner Address</h2>
            <h2>Priority Type</h2>
            <h2 className="mt-6">
              Status: <span className="text-green-400">Approved</span>
            </h2>
          </div>
        </div>
        <div className="pr-5">
          <PrimaryButtonForTenant title="Send Request" />
        </div>
      </div>
    </div>
  );
};

export default page;
