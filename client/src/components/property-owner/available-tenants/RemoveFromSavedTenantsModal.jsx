"use client";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { fileUrlKey } from "@/configs/envConfig";
import { useRemoveFromSavedItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Button, Notification, useToaster } from "rsuite";

const RemoveFromAvailableTenantsModal = ({ modalData, handleClose, handleCloseDrawer }) => {
  const [removeFromSavedItem, { isLoading, isSuccess, isError, error, reset }] = useRemoveFromSavedItemMutation();
  const toaster = useToaster();
  const handleRemoveFromSavedItem = async (itemId) => {
    //
    await removeFromSavedItem({
      itemId,
    });
  };
  useEffect(() => {
    if (!isLoading && !isError && isSuccess && !error) {
      toaster.push(
        <Notification type="success" header="Success" closable>
          Successfully Removed{" "}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 2000,
        },
      );
      reset();
      handleClose();
      handleCloseDrawer();
    }

    if (!isLoading && isError && !isSuccess && error) {
      toaster.push(
        <Notification type="error" header="Error" closable>
          {error?.message || "Removing Failed"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 2000,
        },
      );
      reset();
      handleClose();
      handleCloseDrawer();
    }
  }, [isLoading, isError, isSuccess, error]);
  return (
    <div className="space-y-4">
      <div className="bg-[#ea4b35] flex justify-between w-full px-5 py-3">
        <h2 className="font-medium text-lg text-white">Delete Confirmation</h2>
        <button
          onClick={() => {
            handleClose();
            handleCloseDrawer();
            reset();
          }}
          className=" px-2 hover:text-white/90 py-1  text-white"
        >
          <CgClose size={25} />
        </button>
      </div>
      {/*  */}
      <div className="px-5 pb-2 ">
        <div>
          <h3>You are about to delete the tenant</h3>
        </div>
        <div className="py-2">
          <div className="flex gap-5 items-center">
            <Image
              height={70}
              className="rounded-full"
              width={70}
              src={modalData?.tenant?.profileImage ? `${fileUrlKey()}/${modalData?.tenant?.profileImage}` : profileLogo}
            />
            <h2>
              {modalData?.tenant?.firstName} {modalData?.tenant?.lastName}
            </h2>
          </div>
          <div>
            <p className="font-medium">
              Are you sure? <span className="text-[#ea4b35]">There is no undo! </span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 border-t pt-2  flex gap-5 items-center">
        <button
          onClick={() => {
            handleClose();
            handleCloseDrawer();
            reset();
          }}
          className="border text-sm py-2 hover:bg-slate-100 rounded-md px-3"
        >
          No, keep the tenant
        </button>
        <Button
          loading={isLoading}
          type="button"
          onClick={() => handleRemoveFromSavedItem(modalData?.itemId)}
          className="!bg-[#ea4b35] hover:!bg-[#e93720] !text-white"
        >
          Yes, delete this tenant
        </Button>
      </div>
    </div>
  );
};

export default RemoveFromAvailableTenantsModal;
