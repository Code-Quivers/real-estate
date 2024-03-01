"use client";

import { savedItemTenant, savedItemTenantFailed } from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Button, Modal, Popover, Progress, Whisper, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import AvailableUnitListPopover from "./AvailableUnitListPopover";

const AvailableTenantsModal = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);

  const [saveItem, { isSuccess, isLoading, isError, error }] = useSaveItemMutation();

  const saveTenantData = async () => {
    const tenantData = {
      tenantId: modalData?.tenantId,
      itemType: "TENANT",
    };

    await saveItem(tenantData);
  };

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

  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery();

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
            <div className="flex justify-center gap-5  mx-auto max-w-md mt-10">
              <Button
                loading={isLoading}
                onClick={() => saveTenantData()}
                className="!bg-primary w-full !text-white !px-2 !py-1 !text-base !rounded-none "
              >
                Save
              </Button>
              <button className="bg-primary text-white px-2 py-2  w-full">Contact</button>
              <Whisper
                placement="bottomStart"
                trigger="click"
                speaker={
                  <Popover as="div" className=" max-h-[450px] w-[370px] !rounded-md overflow-y-auto mb-5" arrow={false}>
                    <div className="p-3 space-y-2">
                      {unitRes?.data?.length > 0
                        ? unitRes?.data?.map((singleUnit) => (
                            <div key={Math.random()}>
                              <AvailableUnitListPopover singleUnit={singleUnit} tenantId={modalData?.tenantId} />
                            </div>
                          ))
                        : "No Unit Found"}
                    </div>
                  </Popover>
                }
              >
                <button className="bg-primary text-white px-2 py-1 w-full">Add</button>
              </Whisper>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvailableTenantsModal;
