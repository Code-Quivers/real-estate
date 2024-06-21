"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Drawer, Modal, Notification, Placeholder, Popover, Whisper, useMediaQuery, useToaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignServiceProviderToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOverFromPropertyOwner from "../available-tenants/SendMessagePopOver";
import RemoveFromSavedServiceProviderModal from "../availableServiceProviders/RemoveFromSavedServiceProviderModal";
import Score from "@/components/Shared/Score/Score";

const SavedServiceProviderModalDetails = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const [isMobile] = useMediaQuery("(max-width: 640px)");
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
      <Drawer placement={isMobile ? "bottom" : "right"} size={isMobile ? "lg" : "xs"} open={isModalOpened} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>Service Provider Details</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ padding: 0 }}>
          <div className="py-3">
            {/* top items */}
            <div>
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
              <h2 className="text-sm px-3  text-primary font-bold">
                {modalData?.serviceProvider?.firstName} {modalData?.serviceProvider?.lastName}
              </h2>
            </div>
            {/* service provider information */}
            <div>
              <div className="px-3 space-y-0.5  ">
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
            <div className="flex px-3 py-3 gap-3 justify-between items-center">
              <div className="flex w-full gap-3">
                <div className="w-full">
                  <button
                    onClick={() => setOpen(true)}
                    className="text-primary w-full text-sm py-2 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                  >
                    Remove
                  </button>
                </div>

                {/* assign property */}
                <div className="w-full">
                  <Whisper
                    preventOverflow
                    placement="autoHorizontal"
                    trigger="click"
                    speaker={
                      <Popover className="max-h-[400px] w-[350px] !rounded-md overflow-y-auto mb-5" arrow={false}>
                        <div className="space-y-2">
                          {!isLoadingUnits &&
                            unitRes?.data?.length > 0 &&
                            unitRes?.data?.map((singleDetail) => (
                              <div key={Math.random()}>
                                <button
                                  onClick={() => handleAddServiceProviderToProperty(singleDetail?.serviceProviderId)}
                                  className="grid grid-cols-3 border rounded-lg hover:border-primary  duration-300 transition-all text-start"
                                >
                                  <div className="col-span-1">
                                    <Image
                                      width={500}
                                      height={500}
                                      className="w-[120px] p-1 h-[100px] object-cover rounded-xl"
                                      src={singleDetail?.images?.length ? `${fileUrlKey()}/${singleDetail?.images[0]}` : profileLogo}
                                      alt="photo"
                                    />
                                  </div>
                                  <div className="flex w-full flex-col justify-between my-2 text-sm col-span-2 ml-3">
                                    <h3 className="font-semibold line-clamp-1">${singleDetail?.monthlyRent?.toLocaleString()}</h3>
                                    <h3 className="line-clamp-1">
                                      {singleDetail?.numOfBed} Beds {singleDetail?.numOfBath} Bath
                                    </h3>
                                    <h3 className="line-clamp-2">{singleDetail?.address}</h3>
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
              <SendMessagePopOverFromPropertyOwner receiverId={modalData?.serviceProvider?.userId} />
            </div>
            {/* company information */}
            <div className="border shadow-sm text-sm mx-3 p-2 rounded-md">
              <h1 className="font-semibold">Company Information</h1>
              <h3 className="text-sm font-medium">Name: {modalData?.serviceProvider?.companyName}</h3>
              {/* <h3 className="text-sm font-medium">
                Phone Number : {modalData?.serviceProvider?.phoneNumber ? modalData?.serviceProvider?.phoneNumber.replace(/\d/g, "X") : "N/A"}
              </h3> */}
              <h3 className="text-sm font-medium">
                Company Phone: {modalData?.serviceProvider?.companyPhoneNumber ? modalData?.serviceProvider?.companyPhoneNumber : "N/A"}
              </h3>
              <h3 className="text-sm font-medium">
                Address: {modalData?.serviceProvider?.companyAddress ? modalData?.serviceProvider?.companyAddress : "N/A"}
              </h3>
              <h3 className="text-sm font-medium">
                Email : {modalData?.serviceProvider?.companyEmailAddress ? modalData?.serviceProvider?.companyEmailAddress : "N/A"}
              </h3>
            </div>
            {/* bottom items */}
            <div className="space-y-5 border-t pt-1 px-3 my-5">
              <div className="">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-justify ">
                  {modalData?.serviceProvider?.Service?.serviceDescription ? modalData?.serviceProvider?.Service?.serviceDescription : "N/A"}
                </p>
              </div>
              <div className="">
                <h4 className="font-medium">Cancellation Policy</h4>
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
