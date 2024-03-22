/* eslint-disable prefer-const */
"use client";

import { savedItemServiceProvider } from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Button, Modal, Notification, Popover, Progress, Whisper, useToaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignServiceProviderToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";

const AvailableServiceProviderModal = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
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

  const handleAddTenantToProperty = async (propertyId) => {
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
      <Modal
        size="lg"
        dialogAs="div"
        className="bg-white w-full mx-auto mt-20 rounded-xl"
        overflow={false}
        open={isModalOpened}
        onClose={handleClose}
      >
        <Modal.Body
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <div className="p-5">
            {/* top items */}

            <div className="flex   justify-between items-center ">
              <div className="flex items-center w-full  ">
                <div className="md:flex w-full items-center gap-5">
                  <div className="max-md:flex  items-center justify-between">
                    <Image
                      width={150}
                      height={150}
                      className="w-[180px] md:w-[200px] h-[150px] md:h-[150px]  object-cover rounded-lg "
                      src={modalData?.profileImage ? `${fileUrlKey()}/${modalData?.profileImage}` : profileLogo}
                      alt="Profile Photo"
                    />

                    <div
                      className="md:hidden"
                      style={{
                        width: 100,
                      }}
                    >
                      <Progress.Circle percent={30} strokeColor="green" />
                    </div>
                  </div>
                  <div className="md:flex max-md:mt-5  justify-between w-full   ">
                    <div className="space-y-0.5 flex flex-col justify-between gap-3 ">
                      <h3 className="text-sm font-medium">
                        Provider Name : {modalData?.firstName} {modalData?.lastName}
                      </h3>
                      <h3 className="text-sm font-medium">Service Type : {modalData?.Service?.serviceType}</h3>
                      <h3 className="text-sm font-medium">Priority Type : {modalData?.Service?.serviceAvailability}</h3>
                      <h3 className="text-sm font-medium">Company Name : {modalData?.companyName}</h3>
                      <h3 className="text-sm font-medium">
                        Service Price Range : $ {modalData?.Service?.minPrice} - $ {modalData?.Service?.maxPrice}
                      </h3>
                    </div>

                    <div
                      className="hidden md:block"
                      style={{
                        width: 100,
                      }}
                    >
                      <Progress.Circle percent={30} strokeColor="green" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* middle item */}
            <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-5">
              <div className="col-span-1">
                <h4 className="text-lg font-medium">Description</h4>
                <p className="text-sm text-justify ">{modalData?.Service?.serviceDescription}</p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-medium">Cancellation Policy</h4>
                <p className="text-sm text-justify ">{modalData?.Service?.serviceCancellationPolicy}</p>
              </div>
            </div>
            {/* action */}
            <div className="flex justify-center gap-5 items-center mt-10">
              <Button
                onClick={handleSaveServiceProvider}
                loading={isLoading}
                type="button"
                className={`!px-12 !py-3 !bg-[#29429f] !text-white !rounded-none `}
                size="lg"
                appearance="default"
              >
                Save
              </Button>
              <Button type={"button"} className={`!px-12 !py-3 !bg-[#29429f] !text-white !rounded-none `} size="lg" appearance="default">
                Contact
              </Button>

              {/* add service provider to property */}

              <Whisper
                placement="bottomStart"
                trigger="click"
                speaker={
                  <Popover as="div" className=" max-h-[450px] w-[370px] !rounded-md overflow-y-auto mb-5" arrow={false}>
                    <div className="p-3 space-y-2">
                      {unitRes?.data?.length > 0
                        ? unitRes?.data?.map((singleUnit) => (
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

                              {/* <AvailableServiceProviderPopover singleUnit={singleUnit} serviceProviderId={modalData?.serviceProviderId} /> */}
                            </div>
                          ))
                        : "No Unit Found"}
                    </div>
                  </Popover>
                }
              >
                <Button
                  loading={isLoadingUnits}
                  type={"button"}
                  className={`!px-12 !py-3 !bg-[#29429f] !text-white !rounded-none `}
                  size="lg"
                  appearance="default"
                >
                  Add
                </Button>
              </Whisper>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvailableServiceProviderModal;
