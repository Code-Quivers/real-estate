"use client";

import { fileUrlKey } from "@/configs/envConfig";
import { useRemoveFromSavedItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Button, Message, useToaster } from "rsuite";

const RemoveFromAvailableTenantsModal = ({ modalData, handleClose }) => {
  const [removeFromSavedItem, { isLoading, isSuccess, isError, error, reset }] =
    useRemoveFromSavedItemMutation();
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
        <Message showIcon type="success" closable>
          Successfully removed from saved tenants{" "}
        </Message>,
        {
          placement: "topCenter",
          duration: 2000,
        },
      );
      reset();
      handleClose();
    }
  }, [isLoading, isError, isSuccess, error]);
  return (
    <div className="space-y-4">
      <div className="bg-[#ea4b35] flex justify-between w-full px-5 py-3">
        <h2 className="font-medium text-lg text-white">Delete Confirmation</h2>
        <button
          onClick={handleClose}
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
        <div>
          <div className="flex gap-5 items-center">
            <Image
              height={70}
              className="rounded-full"
              width={70}
              src={`${fileUrlKey()}/${modalData?.tenant?.profileImage}`}
            />
            <h2>
              {modalData?.tenant?.firstName} {modalData?.tenant?.lastName}
            </h2>
          </div>
          <div>
            <p className="font-medium">
              Are you sure?{" "}
              <span className="text-[#ea4b35]">There is no undo! </span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 border-t pt-2  flex gap-5 items-center">
        <button
          onClick={handleClose}
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
