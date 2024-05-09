"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Drawer, Modal, Notification, Placeholder, Popover, Whisper, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignTenantToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOverFromPropertyOwner from "../available-tenants/SendMessagePopOver";
import RemoveFromAvailableTenantsModal from "../available-tenants/RemoveFromSavedTenantsModal";

const SavedTenantModalDetails = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery();

  const [open, setOpen] = useState(false);
  const [removeModalData, setRemoveModalData] = useState(null);

  const handleOpen = (selectData) => {
    setRemoveModalData(selectData);
    setOpen(true);
  };
  const handleCloseRemove = () => setOpen(false);

  // !

  // !
  const [
    assignTenantToProperty,
    { data: assignRes, isLoading: isLoadingAssign, isSuccess: isSuccessAssign, isError: isErrorAssign, error: errorAssign },
  ] = useAssignTenantToPropertyMutation();

  const handleAddTenantToProperty = async (propertyId) => {
    const assignData = {
      propertyId,
      tenantId: modalData?.tenant?.tenantId,
    };

    await assignTenantToProperty({
      data: assignData,
    });
  };

  // !
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
      <Drawer placement="right" size="xs" open={isModalOpened} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>Tenant Details</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ padding: 0 }}>
          <div className="p-5">
            {/* top items */}

            <div className="flex items-center gap-5 ">
              <div className="">
                <Image
                  width={100}
                  height={100}
                  className="w-[100px] ring-2 ring-[#545454] border-black shadow-2xl  h-[100px] object-cover   rounded-full  "
                  src={modalData?.tenant?.profileImage ? `${fileUrlKey()}/${modalData?.tenant?.profileImage}` : profileLogo}
                  alt="Tenant Photo"
                />
              </div>
              <div className="space-y-3">
                <h3>
                  {modalData?.tenant?.firstName} {modalData?.tenant?.lastName}
                </h3>
                <h3>Place to rent : -- ?? </h3>
                <h3>Rent willing to pay : {modalData?.tenant?.affordableRentAmount ?? "--"}</h3>
              </div>
            </div>

            {/* action */}
            <div className="flex px-3 py-5 gap-2">
              <div className="w-full">
                <button
                  //   loading={isLoading}
                  onClick={() => handleOpen(modalData)}
                  className="text-primary w-full text-sm py-1.5 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                >
                  Remove
                </button>
              </div>
              {/* Contact  */}
              <div className="w-full">
                <SendMessagePopOverFromPropertyOwner receiverId={modalData?.tenant?.user?.userId} />
              </div>
              {/*  */}
              <div className="w-full">
                <Whisper
                  preventOverflow
                  placement="auto"
                  trigger="click"
                  speaker={
                    <Popover as="div" className="max-h-[450px] w-[350px] !rounded-md overflow-y-auto mb-5" arrow={false}>
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
                  <button className="text-primary w-full text-sm py-1.5 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]">Add</button>
                </Whisper>
              </div>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      {/* delete modal */}
      <Modal open={open} size="xs" dialogAs="div" overflow={false} className="bg-white mx-auto" backdrop="static" onClose={handleClose}>
        <Modal.Body>
          <RemoveFromAvailableTenantsModal handleClose={handleCloseRemove} handleCloseDrawer={handleClose} modalData={removeModalData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SavedTenantModalDetails;
