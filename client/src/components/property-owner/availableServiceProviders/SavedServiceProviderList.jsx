"use client";
import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Modal, Notification, Placeholder, Popover, Whisper, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignServiceProviderToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import Score from "@/components/Shared/Score/Score";
import SendMessagePopOverFromPropertyOwner from "../available-tenants/SendMessagePopOver";
import RemoveFromSavedServiceProviderModal from "./RemoveFromSavedServiceProviderModal";

const SavedServiceProviderList = ({ singleReq, children }) => {
  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = (selectData) => {
    setModalData(selectData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // !
  const [
    assignServiceProviderToProperty,
    { data: assignRes, isLoading: isLoadingAssign, isSuccess: isSuccessAssign, isError: isErrorAssign, error: errorAssign },
  ] = useAssignServiceProviderToPropertyMutation();

  const handleAddServiceProviderToProperty = async (propertyId) => {
    const assignData = {
      propertyId,
      serviceProviderId: singleReq?.serviceProvider?.serviceProviderId,
    };

    await assignServiceProviderToProperty({
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
        {singleReq?.serviceProvider?.profileImage ? (
          <Image
            width={100}
            height={100}
            className="w-[90px] h-[90px] p-3 object-cover rounded-full  "
            src={`${fileUrlKey()}/${singleReq?.serviceProvider?.profileImage}`}
            alt="photo"
          />
        ) : (
          <div className="p-3">
            <Avatar circle size="lg" />
          </div>
        )}

        <div className="mr-4 mt-4">
          <Score score={singleReq?.serviceProvider?.scoreRatio?.score} total={singleReq?.serviceProvider?.scoreRatio?.total} />
        </div>
      </div>
      {/*  */}
      <div>{children}</div>

      {/* action */}
      <div className="flex px-3 py-5 gap-2">
        <div className="w-full">
          <button
            onClick={() => handleOpen(singleReq)}
            className="text-primary w-full text-sm py-1.5 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
          >
            Remove
          </button>
        </div>
        {/* Contact  */}
        <div className="w-full">
          <SendMessagePopOverFromPropertyOwner receiverId={singleReq?.serviceProvider?.user?.userId} />
        </div>
        {/*  assign to property */}
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
                          onClick={() => handleAddServiceProviderToProperty(singleUnit?.propertyId)}
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
      {/* delete modal */}
      <Modal open={open} size="xs" dialogAs="div" overflow={false} className="bg-white mx-auto" backdrop="static" onClose={handleClose}>
        <Modal.Body>
          <RemoveFromSavedServiceProviderModal handleClose={handleClose} modalData={modalData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SavedServiceProviderList;
