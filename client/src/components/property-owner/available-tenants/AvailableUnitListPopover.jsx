"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignTenantToPropertyMutation } from "@/redux/features/propertyOwner/propertyApi";
import { useEffect } from "react";
import { Notification, useToaster } from "rsuite";
// !
const AvailableUnitListPopover = ({ singleUnit, tenantId }) => {
  const [assignTenantToProperty, { data, isLoading, isSuccess, isError, error, reset }] = useAssignTenantToPropertyMutation();
  const toaster = useToaster();

  const handleAddTenantToProperty = async (propertyId) => {
    const assignData = {
      propertyId,
      tenantId,
    };

    await assignTenantToProperty({
      data: assignData,
    });
  };

  useEffect(() => {
    if (!isLoading && !isError && isSuccess && !error) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{data?.message ?? "Successfully Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      reset();
    }
    if (!isLoading && isError && !isSuccess && error) {
      toaster.push(
        <Notification type="error" header="Failed" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message ?? "Failed to Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, toaster]);

  return (
    <button
      onClick={() => handleAddTenantToProperty(singleUnit?.propertyId)}
      className="flex  w-full gap-3 border rounded-lg hover:border-primary  duration-300 transition-all text-start"
    >
      <div>
        <Image
          width={120}
          height={120}
          className="w-[150px] h-[90px]   p-1 object-cover rounded-xl"
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
