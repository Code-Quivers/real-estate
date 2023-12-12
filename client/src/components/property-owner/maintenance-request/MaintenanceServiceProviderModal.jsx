"use client";

import PrimaryButton from "@/components/Shared/Button/PrimaryButton";
import Image from "next/image";
import { Modal } from "rsuite";

const MaintenanceServiceProviderModal = ({
  isModalOpened,
  setModalOpened,
  modalData,
}) => {
  const handleClose = () => setModalOpened(false);

  const modalBodyStyle = {
    padding: 0,
    margin: 0,
  };

  return (
    <>
      <Modal
        overflow={false}
        size="lg"
        className=""
        open={isModalOpened}
        onClose={handleClose}
      >
        <Modal.Body
          className="border-2 border-[#545454]"
          style={modalBodyStyle}
        >
          <div className="p-5">
            {/* top items */}

            <div className="flex  justify-between items-center ">
              <div className="flex items-center w-full">
                <div className="flex gap-5">
                  <div className="  flex w-full justify-center">
                    <Image
                      className="w-[120px] ring-2 ring-[#545454] border-black shadow-2xl  h-[120px] object-cover   rounded-full  "
                      src={modalData?.image}
                      alt="photo"
                    />
                  </div>
                  <div className="flex justify-between w-full ">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">
                        {modalData?.serviceProviderName}
                      </h3>
                      <h3 className="text-sm font-medium">
                        {modalData?.serviceType}
                      </h3>
                      <h3 className="text-sm font-medium">
                        {modalData?.priorityType}
                      </h3>
                      <h3 className="text-sm font-medium">
                        Service Price : ${modalData?.servicePrice}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-3">
                <div className=" outline outline-[6px] outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[60px] h-[60px]">
                  <div className=" flex w-full flex-col justify-center items-center">
                    <span>9</span>
                    <span className="w-[70%] border-t border-[#b6b6b6]" />
                    <span>10</span>
                  </div>
                </div>
              </div>
            </div>
            {/* middle item */}
            <div className="grid grid-cols-2 gap-6 mt-5">
              <div className="col-span-1">
                <h4 className="text-lg font-medium">Description</h4>
                <p className="text-sm text-justify ">
                  {modalData?.description}
                </p>
              </div>
              <div className="col-span-1">
                <h4 className="text-lg font-medium">Cancellation Policy</h4>
                <p className="text-sm text-justify ">
                  {modalData?.cancellationPolicy}
                </p>
              </div>
            </div>
            {/* action */}
            <div className="flex justify-center gap-5 items-center mt-10">
              <PrimaryButton title="Save" />
              <PrimaryButton title="Contact" />
              <PrimaryButton title="Add" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MaintenanceServiceProviderModal;
