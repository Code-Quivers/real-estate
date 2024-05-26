"use client";
import { savedItemTenant, savedItemTenantFailed } from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Avatar, Notification, Placeholder, Popover, Whisper, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignTenantToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOverFromPropertyOwner from "./SendMessagePopOver";
import Score from "@/components/Shared/Score/Score";

const AvailableTenantsList = ({ singleReq, children }) => {
  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery();
  const [saveItem, { isSuccess, isLoading, isError, error }] = useSaveItemMutation();

  const saveTenantData = async () => {
    const tenantData = {
      tenantId: singleReq?.tenantId,
      itemType: "TENANT",
    };

    await saveItem(tenantData);
  };

  // !side effect

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(savedItemTenant(), {
        placement: "bottomStart",
      });
    }
    if (isError && !isSuccess && error && !isLoading) {
      toaster.push(savedItemTenantFailed(error?.message), {
        placement: "bottomStart",
      });
    }
  }, [isSuccess, isSuccess, error]);

  // !
  const [
    assignTenantToProperty,
    { data: assignRes, isLoading: isLoadingAssign, isSuccess: isSuccessAssign, isError: isErrorAssign, error: errorAssign },
  ] = useAssignTenantToPropertyMutation();

  const handleAddTenantToProperty = async (propertyId) => {
    const assignData = {
      propertyId,
      tenantId: singleReq?.tenantId,
    };

    await assignTenantToProperty({
      data: assignData,
    });
  };

  // ! side effect
  useEffect(() => {
    if (!isLoadingAssign && !isErrorAssign && isSuccessAssign && !errorAssign) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{assignRes?.message ?? "Successfully Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
    if (!isLoadingAssign && isErrorAssign && !isSuccessAssign && errorAssign) {
      toaster.push(
        <Notification type="error" header="Failed" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{errorAssign?.message ?? "Failed to Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingAssign, isErrorAssign, isSuccessAssign, errorAssign, toaster]);
  return (
    <>
      <div className="flex items-start justify-between">
        {singleReq?.profileImage ? (
          <Image
            width={100}
            height={100}
            className="w-[90px] h-[90px] p-3 object-cover rounded-full  "
            src={`${fileUrlKey()}/${singleReq?.profileImage}`}
            alt="photo"
          />
        ) : (
          <div className="p-3">
            <Avatar circle size="lg" />
          </div>
        )}

        <div className="mr-4 mt-4">
          <Score score={singleReq?.scoreRatio?.score} total={singleReq?.scoreRatio?.total} />
        </div>
      </div>
      {/*  */}
      <div>{children}</div>

      {/* action */}
      <div className="flex justify-between items-center px-3 py-5 gap-3">
        {/* save and add */}
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <button
              //   loading={isLoading}
              onClick={() => saveTenantData()}
              className="text-primary w-full text-sm py-2 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
            >
              Save
            </button>
          </div>
          {/*  assign to property */}
          <div className="w-full">
            <Whisper
              preventOverflow
              placement="autoHorizontal"
              trigger="click"
              speaker={
                <Popover className="max-h-[400px] max-w-[350px] !rounded-md overflow-y-auto mb-5" arrow={false}>
                  <div className="space-y-2">
                    {!isLoadingUnits &&
                      unitRes?.data?.length > 0 &&
                      unitRes?.data?.map((singleUnit, index) => (
                        <div key={index}>
                          <button
                            onClick={() => handleAddTenantToProperty(singleUnit?.propertyId)}
                            className="grid grid-cols-3 border rounded-lg hover:border-primary   duration-300 transition-all text-start shadow-sm"
                          >
                            <div className="col-span-1 h-full">
                              <Image
                                width={500}
                                height={500}
                                className="h-full w-full p-1 object-cover rounded-xl"
                                src={singleUnit?.images?.length ? `${fileUrlKey()}/${singleUnit?.images[0]}` : profileLogo}
                                alt="photo"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-between my-2 text-sm col-span-2 px-2">
                              <h3 className="font-semibold">${singleUnit?.monthlyRent?.toLocaleString()}</h3>
                              <h3>
                                {singleUnit?.numOfBed} Beds | {singleUnit?.numOfBath} Bath
                              </h3>
                              <h3 className="line-clamp-2">{singleUnit?.address || "N/A"}</h3>
                            </div>
                          </button>
                        </div>
                      ))}

                    {isLoadingUnits && (
                      <div className=" mt-10 gap-y-5 flex flex-col">
                        <div>
                          <Placeholder.Graph active height={150} />
                        </div>
                        <div>
                          <Placeholder.Graph active height={150} />
                        </div>
                      </div>
                    )}

                    {/* if no data is available */}
                    {!isLoadingUnits && !unitRes?.data?.length && (
                      <div className="flex justify-center min-h-[10vh] items-center">
                        <h2 className="text-2xl font-semibold text-rose-400">No Available Unit Found !</h2>
                      </div>
                    )}
                  </div>
                </Popover>
              }
            >
              <button className="text-primary w-full text-sm py-2 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]">Add</button>
            </Whisper>
          </div>
        </div>
        {/* Contact  */}
        <div>
          <SendMessagePopOverFromPropertyOwner receiverId={singleReq?.user?.userId} />
        </div>
      </div>
    </>
  );
};

export default AvailableTenantsList;
