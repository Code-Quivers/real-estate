"use client";

import PrimaryButton from "@/components/Shared/Button/PrimaryButton";
import {
  savedItemTenant,
  savedItemTenantFailed,
} from "@/components/toasts/auth/authToastMessages";
import { fileUrlKey } from "@/configs/envConfig";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { Modal, Progress, toaster } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";

const AvailableTenantsModal = ({
  isModalOpened,
  setModalOpened,
  modalData,
}) => {
  const handleClose = () => setModalOpened(false);

  const modalBodyStyle = {
    padding: 0,
    margin: 0,
  };

  const [saveItem, { isSuccess, isError, error }] = useSaveItemMutation();

  const saveTenantData = async () => {
    const tenantData = {
      tenantId: modalData?.tenantId,
      itemType: "TENANT",
    };

    await saveItem(tenantData);
  };

  useEffect(() => {
    if (isSuccess) {
      toaster.push(savedItemTenant(), {
        placement: "bottomStart",
      });
    }
    if (isError && !isSuccess && error) {
      toaster.push(savedItemTenantFailed(error?.message), {
        placement: "bottomStart",
      });
    }
  }, [isSuccess, isSuccess, error]);

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
            <div className="grid grid-cols-5">
              <div className="col-span-4 flex items-center gap-5 ">
                <div className="">
                  <Image
                    className="w-[120px] ring-2 ring-[#545454] border-black shadow-2xl  h-[120px] object-cover   rounded-full  "
                    src={
                      modalData?.image
                        ? `${fileUrlKey()}/${modalData?.image}`
                        : profileLogo
                    }
                    alt="photo"
                  />
                </div>
                <div className="space-y-3">
                  <h3>
                    Tenant Name : {modalData?.firstName} {modalData?.lastName}
                  </h3>
                  <h3>Place to rent : -- ?? </h3>
                  <h3>
                    Rent willing to pay :{" "}
                    {modalData?.affordableRentAmount ?? "--"}
                  </h3>
                </div>
              </div>
              <div className="col-span-1">
                {" "}
                <div style={{ width: 120, marginTop: 10 }}>
                  <Progress.Circle percent="40" strokeColor="green" />
                </div>
              </div>
            </div>

            {/* action */}
            <div className="flex justify-center gap-5 items-center mt-10">
              <PrimaryButton title="Save" onClickHandler={saveTenantData} />
              <PrimaryButton title="Contact" />
              <PrimaryButton title="Add" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvailableTenantsModal;
