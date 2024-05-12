"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Drawer, Modal, Notification, Placeholder, Popover, Whisper, useToaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignServiceProviderToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOverFromPropertyOwner from "../available-tenants/SendMessagePopOver";
import RemoveFromSavedServiceProviderModal from "../availableServiceProviders/RemoveFromSavedServiceProviderModal";
import Score from "@/components/Shared/Score/Score";

const SavedServiceProviderModalDetails = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery();
  const [open, setOpen] = useState(false);
  const handleCloseRemove = () => setOpen(false);
  // !

  const [
    assignServiceProviderToProperty,
    { data: assignRes, isLoading: isLoadingAssign, isSuccess: isSuccessAssign, isError: isErrorAssign, error: errorAssign },
  ] = useAssignServiceProviderToPropertyMutation();

  const handleAddServiceProviderToProperty = async (propertyId) => {
    const assignData = {
      propertyId,
      serviceProviderId: modalData?.serviceProviderId,
    };

    await assignServiceProviderToProperty({
      data: assignData,
    });
  };
  // !
  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoadingAssign && !isErrorAssign && isSuccessAssign && !errorAssign) {
      toaster.push(
        <Notification type="success" header="Success" closable>
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
      <Drawer placement="right" size="xs" open={isModalOpened} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>Service Provider Details</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ padding: 0 }}>
          <div className="py-3 px-1">
            {/* top items */}
            <div className="flex items-start justify-between">
              {modalData?.serviceProvider?.profileImage ? (
                <Image
                  width={100}
                  height={100}
                  className="w-[90px] h-[90px] p-3 object-cover rounded-full  "
                  src={modalData?.serviceProvider?.profileImage ? `${fileUrlKey()}/${modalData?.serviceProvider?.profileImage}` : profileLogo}
                  alt="Profile Photo"
                />
              ) : (
                <div className="p-3">
                  <Avatar circle size="lg" />
                </div>
              )}

              <div className="mr-4 mt-4">
                <Score score={modalData?.serviceProvider?.scoreRatio?.score} total={modalData?.serviceProvider?.scoreRatio?.total} />
              </div>
            </div>
            {/*  */}
            <div>
              <div className="px-3 space-y-0.5  ">
                <h2 type="button" className="text-sm  text-primary cursor-pointer font-bold">
                  {modalData?.serviceProvider?.firstName} {modalData?.serviceProvider?.lastName}
                </h2>
                <h3 className="text-sm font-medium">Company Name : {modalData?.serviceProvider?.companyName}</h3>
                <h3 className="text-sm font-medium">
                  Phone Number : {modalData?.serviceProvider?.phoneNumber ? modalData?.serviceProvider?.phoneNumber.replace(/\d/g, "X") : "N/A"}
                </h3>
                <h3 className="text-sm font-medium">
                  Company Name : {modalData?.serviceProvider?.companyName ? modalData?.serviceProvider?.companyName : "N/A"}
                </h3>
                <h3 className="text-sm font-medium">
                  Company Phone Number :{" "}
                  {modalData?.serviceProvider?.companyPhoneNumber ? modalData?.serviceProvider?.companyPhoneNumber.replace(/\d/g, "X") : "N/A"}
                </h3>
                <h3 className="text-sm font-medium">
                  Company Email : {modalData?.serviceProvider?.companyEmailAddress ? modalData?.serviceProvider?.companyEmailAddress : "N/A"}
                </h3>
                <h3 className="text-sm font-medium">
                  Company Address : {modalData?.serviceProvider?.companyAddress ? modalData?.serviceProvider?.companyAddress : "N/A"}
                </h3>
                <h3 className="text-sm font-medium">
                  Service Type :{" "}
                  {modalData?.serviceProvider?.Service?.serviceType
                    ? modalData?.serviceProvider?.Service?.serviceType
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                    : "N/A"}
                </h3>

                <h3 className="text-sm font-medium">
                  Priority Type :{" "}
                  {modalData?.serviceProvider?.Service?.serviceAvailability
                    ? modalData?.serviceProvider?.Service?.serviceAvailability
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                    : "N/A"}
                </h3>
                <h3 className="text-sm font-medium">
                  Service Price Range : ${" "}
                  {modalData?.serviceProvider?.Service?.minPrice ? modalData?.serviceProvider?.Service?.minPrice?.toLocaleString() : "0"} - ${" "}
                  {modalData?.serviceProvider?.Service?.maxPrice ? modalData?.serviceProvider?.Service?.maxPrice?.toLocaleString() : "0"}
                </h3>
              </div>
            </div>
            {/* action */}
            <div className="flex px-3 py-3 gap-2">
              <div className="w-full">
                <button
                  onClick={() => setOpen(true)}
                  className="text-primary w-full text-sm py-1.5 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                >
                  Remove
                </button>
              </div>
              {/* Contact  */}
              <div className="w-full">
                <SendMessagePopOverFromPropertyOwner receiverId={modalData?.serviceProvider?.user?.userId} />
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
                          unitRes?.data?.map((singleDetail) => (
                            <div key={Math.random()}>
                              <button
                                onClick={() => handleAddServiceProviderToProperty(singleDetail?.serviceProviderId)}
                                className="flex  w-full gap-3 border rounded-lg hover:border-primary  duration-300 transition-all text-start"
                              >
                                <div>
                                  <Image
                                    width={100}
                                    height={100}
                                    className="!w-[100px] !h-[100px]   p-1 object-cover rounded-xl"
                                    src={singleDetail?.images?.length ? `${fileUrlKey()}/${singleDetail?.images[0]}` : profileLogo}
                                    alt="photo"
                                  />
                                </div>
                                <div className="flex w-full flex-col justify-between my-2 text-[14px] font-medium">
                                  <h3>${singleDetail?.monthlyRent}</h3>
                                  <h3>
                                    {singleDetail?.numOfBed} Beds {singleDetail?.numOfBath} Bath
                                  </h3>
                                  <h3>{singleDetail?.address}</h3>
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
            {/* bottom items */}
            <div className="space-y-5  border-t pt-1 px-3">
              <div className="">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-justify ">
                  {modalData?.serviceProvider?.Service?.serviceDescription ? modalData?.serviceProvider?.Service?.serviceDescription : "N/A"}
                </p>
              </div>
              <div className="">
                <h4 className="text-sm font-medium">Cancellation Policy</h4>
                <p className="text-sm text-justify ">{modalData?.serviceProvider?.Service?.serviceCancellationPolicy || "N/A"}</p>
              </div>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      {/* delete modal */}
      <Modal open={open} size="xs" dialogAs="div" overflow={false} className="bg-white mx-auto" backdrop="static" onClose={handleClose}>
        <Modal.Body>
          <RemoveFromSavedServiceProviderModal handleClose={handleCloseRemove} modalData={modalData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SavedServiceProviderModalDetails;
