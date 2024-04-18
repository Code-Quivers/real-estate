"use client";

import { savedItemTenant, savedItemTenantFailed } from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Button, Modal, Notification, Placeholder, Popover, Progress, Whisper, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignTenantToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOver from "./SendMessagePopOver";

const AvailableTenantsDetailModal = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const { data: unitRes, isLoading: isLoadingUnits, isFetching } = useGetMyAllUnitsQuery();

  const [saveItem, { isSuccess, isLoading, isError, error }] = useSaveItemMutation();

  const saveTenantData = async () => {
    const tenantData = {
      tenantId: modalData?.tenantId,
      itemType: "TENANT",
    };

    await saveItem(tenantData);
  };

  // !

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
      tenantId: modalData?.tenantId,
    };

    await assignTenantToProperty({
      data: assignData,
    });
  };

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
      handleClose();
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
      <Modal
        overflow={false}
        size="lg"
        dialogAs="div"
        className="!rounded-2xl mt-40  bg-white mx-auto w-full"
        open={isModalOpened}
        onClose={handleClose}
      >
        <Modal.Body className="" style={{ padding: 0 }}>
          <div className="p-5">
            {/* top items */}
            <div className="grid grid-cols-5">
              <div className="col-span-4 flex items-center gap-5 ">
                <div className="">
                  <Image
                    width={120}
                    height={120}
                    className="w-[120px] ring-2 ring-[#545454] border-black shadow-2xl  h-[120px] object-cover   rounded-full  "
                    src={modalData?.profileImage ? `${fileUrlKey()}/${modalData?.profileImage}` : profileLogo}
                    alt="Tenant Photo"
                  />
                </div>
                <div className="space-y-3">
                  <h3>
                    {modalData?.firstName} {modalData?.lastName}
                  </h3>
                  <h3>Place to rent : -- ?? </h3>
                  <h3>Rent willing to pay : {modalData?.affordableRentAmount ?? "--"}</h3>
                </div>
              </div>
              <div className="col-span-1">
                <div style={{ width: 120, marginTop: 10 }}>
                  <Progress.Circle percent="80" strokeColor="green" />
                </div>
              </div>
            </div>

            {/* action */}
            <div className="flex justify-center gap-3  mx-auto max-w-md mt-10">
              <div>
                <Button
                  loading={isLoading}
                  onClick={() => saveTenantData()}
                  className="!bg-primary w-full !text-white !px-2 !py-1 !text-base !rounded-none "
                >
                  Save
                </Button>
              </div>

              {/* Contact  */}
              <div>
                <SendMessagePopOver receiverId={modalData?.user?.userId} />
              </div>
              {/*  */}
              <div>
                <Whisper
                  placement="bottomStart"
                  trigger="click"
                  speaker={
                    <Popover as="div" className=" max-h-[450px] w-[370px] !rounded-md overflow-y-auto mb-5" arrow={false}>
                      <div className="p-3 space-y-2">
                        {!isLoadingUnits &&
                          unitRes?.data?.length > 0 &&
                          unitRes?.data?.map((singleUnit) => (
                            <div key={Math.random()}>
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
                  <button className="bg-primary text-white px-2 py-1 w-full">Add</button>
                </Whisper>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvailableTenantsDetailModal;
