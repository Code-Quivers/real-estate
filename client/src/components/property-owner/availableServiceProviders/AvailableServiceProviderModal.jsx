"use client";

import PrimaryButton from "@/components/Shared/Button/PrimaryButton";
import { savedItemServiceProvider } from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Button, Modal, Progress, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";

const AvailableServiceProviderModal = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const modalBodyStyle = {
    padding: 0,
    margin: 0,
  };

  const [saveServiceProvider, { isSuccess, isLoading, isError, error, reset }] = useSaveItemMutation();

  const handleSaveServiceProvider = async () => {
    const serviceProviderData = {
      serviceProviderId: modalData?.serviceProviderId,
      itemType: "SERVICE",
    };

    await saveServiceProvider(serviceProviderData);
  };

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
        <Modal.Body className="border-2 border-[#545454]" style={modalBodyStyle}>
          <div className="p-5">
            {/* top items */}

            <div className="flex  justify-between items-center ">
              <div className="flex items-center w-full  ">
                <div className="flex w-full gap-5">
                  <div>
                    <Image
                      width={150}
                      height={150}
                      className="w-[200px] object-cover rounded-lg h-[150px]"
                      src={modalData?.profileImage ? `${fileUrlKey()}/${modalData?.profileImage}` : profileLogo}
                      alt="Profile Photo"
                    />
                  </div>
                  <div className="flex justify-between w-full   ">
                    <div className="space-y-0.5">
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
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: 90,
                  display: "inline-block",
                }}
              >
                <Progress.Circle percent={30} strokeColor="green" />
              </div>
            </div>
            {/* middle item */}
            <div className="grid grid-cols-2 gap-6 mt-5">
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
                type={"button"}
                className={`!px-12 !py-3 !bg-[#29429f] !text-white !rounded-none `}
                size="lg"
                appearance="default"
              >
                Save
              </Button>
              <PrimaryButton title="Contact" />
              <PrimaryButton title="Add" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvailableServiceProviderModal;
