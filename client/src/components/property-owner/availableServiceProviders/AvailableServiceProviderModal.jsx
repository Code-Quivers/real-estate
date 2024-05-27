/* eslint-disable prefer-const */
"use client";

import { savedItemServiceProvider } from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Avatar, Drawer, Notification, Placeholder, Popover, Whisper, useMediaQuery, useToaster } from "rsuite";
import { useAssignServiceProviderToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOverFromPropertyOwner from "../available-tenants/SendMessagePopOver";
import Score from "@/components/Shared/Score/Score";

const AvailableServiceProviderModal = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const [isMobile] = useMediaQuery("(max-width: 640px)");
  const toaster = useToaster();

  const [saveServiceProvider, { isSuccess, isLoading, isError, error, reset }] = useSaveItemMutation();
  let query = {};
  query["limit"] = 100;

  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery({ ...query });
  // ! handle  save
  const handleSaveServiceProvider = async () => {
    const serviceProviderData = {
      serviceProviderId: modalData?.serviceProviderId,
      itemType: "SERVICE",
    };

    await saveServiceProvider(serviceProviderData);
  };
  // !
  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error) {
      toaster.push(
        savedItemServiceProvider({
          type: "success",
          message: "Service Provider Saved Successfully",
          header: "success",
        }),
        {
          placement: "bottomStart",
        },
      );
      handleClose();
      reset();
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        savedItemServiceProvider({
          type: "error",
          message: error?.message || "Something went wrong!",
          header: "error",
        }),
        {
          placement: "bottomStart",
        },
      );

      reset();
    }
  }, [isSuccess, isLoading, isError, error, handleClose, reset, toaster]);

  // !-------------------------------------

  const [
    assignServiceProviderToProperty,
    { data: dataAdd, isLoading: isLoadingAdd, isSuccess: isSuccessAdd, isError: isErrorAdd, error: errorAdd, reset: resetAdd },
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
  // ! ------

  useEffect(() => {
    if (!isLoadingAdd && !isErrorAdd && isSuccessAdd && dataAdd) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{dataAdd?.message ?? "Successfully Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
    if (!isLoadingAdd && isErrorAdd && !isSuccessAdd && errorAdd) {
      toaster.push(
        <Notification type="error" header="Failed" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{errorAdd?.message ?? "Failed to Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      resetAdd();
    }
  }, [isLoadingAdd, isErrorAdd, isSuccessAdd, errorAdd, dataAdd, toaster, resetAdd]);

  return (
    <>
      <Drawer placement={isMobile ? "bottom" : "right"} size={isMobile ? "lg" : "xs"} open={isModalOpened} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>Service Provider Details</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <div className="px-5 sm:p-3">
            {/* top items */}

            <div className=" ">
              <div className="flex items-start justify-between">
                {modalData?.profileImage ? (
                  <Image
                    width={300}
                    height={300}
                    className="w-[90px] h-[90px] p-3 object-cover rounded-full"
                    src={`${fileUrlKey()}/${modalData?.profileImage}`}
                    alt="photo"
                  />
                ) : (
                  <div className="p-3">
                    <Avatar circle size="lg" />
                  </div>
                )}

                <div className="mr-4 mt-4">
                  <Score score={modalData?.scoreRatio?.score} total={modalData?.scoreRatio?.total} />
                </div>
              </div>
              <h2 className="text-sm text-primary font-bold">
                {modalData?.firstName} {modalData?.lastName}
              </h2>
              <h3 className="text-sm">
                Service Type :
                {modalData?.Service?.serviceType
                  ? modalData?.Service?.serviceType
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())
                  : "N/A"}
              </h3>
              <h3 className="text-sm">
                Service Price Range: ${modalData?.Service?.minPrice ? modalData?.Service?.minPrice?.toLocaleString() : "0"} - $
                {modalData?.Service?.maxPrice ? modalData?.Service?.maxPrice?.toLocaleString() : "0"}
              </h3>
              <h3 className="text-sm">
                Priority Type:{" "}
                {modalData?.Service?.serviceAvailability
                  ? modalData?.Service?.serviceAvailability
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())
                  : "N/A"}
              </h3>
            </div>
          </div>
          {/* buttons */}
          <div className="flex px-3 py-3 lex justify-between items-center gap-3">
            <div className="flex gap-3 w-full">
              <div className="w-full">
                <button
                  onClick={handleSaveServiceProvider}
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
                                onClick={() => handleAddServiceProviderToProperty(singleUnit?.propertyId)}
                                className="grid grid-cols-3 border rounded-lg hover:border-primary  duration-300 transition-all text-start"
                              >
                                <div className="col-span-1">
                                  <Image
                                    width={500}
                                    height={500}
                                    className="w-[120px] p-1 h-[100px] object-cover rounded-xl"
                                    src={singleUnit?.images?.length && `${fileUrlKey()}/${singleUnit?.images[0]}`}
                                    alt="photo"
                                  />
                                </div>
                                <div className="flex w-full flex-col justify-between my-2 text-sm col-span-2 px-2">
                                  <h3 className="font-semibold line-clamp-1">${singleUnit?.monthlyRent?.toLocaleString()}</h3>
                                  <h3 className="line-clamp-1">
                                    {singleUnit?.numOfBed} Beds | {singleUnit?.numOfBath} Bath
                                  </h3>
                                  <h3 className="line-clamp-2">{singleUnit?.address}</h3>
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
            <SendMessagePopOverFromPropertyOwner receiverId={modalData?.user?.userId} />
          </div>
          {/* company information */}
          <div>
            <div className="border shadow-sm text-sm mx-3 p-2 rounded-md">
              <h1 className="font-semibold">Company Information</h1>
              <h3>Name: {modalData?.companyName ? modalData?.companyName : "N/A"}</h3>
              {/* <h3>Phone Number : {modalData?.phoneNumber ? modalData?.phoneNumber?.replace(/\d/g, "X") : "N/A"}</h3> */}
              <h3>Company Phone: {modalData?.companyPhoneNumber ? modalData?.companyPhoneNumber : "N/A"}</h3>
              <h3>Address: {modalData?.companyAddress ? modalData?.companyAddress : "N/A"}</h3>
              <h3>Email: {modalData?.companyEmailAddress ? modalData?.companyEmailAddress : "N/A"}</h3>
            </div>
          </div>
          {/* middle item */}
          <div className="space-y-5 border-t my-4">
            <div className="mt-3 px-3">
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-justify ">{modalData?.Service?.serviceDescription || "N/A"}</p>
            </div>
            <div className="px-3">
              <h4 className="font-medium">Cancellation Policy</h4>
              <p className="text-sm text-justify ">{modalData?.Service?.serviceCancellationPolicy || "N/A"}</p>
            </div>
          </div>
          {/* action */}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default AvailableServiceProviderModal;
