"use client";

import { useRemoveDocumentTemplateMutation } from "@/redux/features/documents/documentsApi";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Button, Modal, Notification, useToaster } from "rsuite";

const RemoveTemplateModal = ({ open, modalData, handleClose }) => {
  const [removeDocumentTemplate, { isLoading, isSuccess, isError, error, reset }] = useRemoveDocumentTemplateMutation();
  const toaster = useToaster();
  const handleRemoveFromSavedItem = async () => {
    //

    await removeDocumentTemplate({
      data: {
        filePath: modalData?.filePath,
      },
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
    }
  }, [isLoading, isError, isSuccess, error]);

  //
  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Body>
        <div className="space-y-4">
          <div className="bg-[#ea4b35] flex justify-between w-full px-5 py-3">
            <h2 className="font-medium text-lg text-white">Delete Confirmation</h2>
            <button
              onClick={() => {
                handleClose();
                reset();
              }}
              className=" px-2 hover:text-white/90 py-1  text-white"
            >
              <CgClose size={25} />
            </button>
          </div>
          {/*  */}
          <div className="  pb-2 ">
            <div className="my-5">
              <h3>You are about to delete This Template</h3>
            </div>
            <div className="p-5 border ">
              <div className="">
                <h2>Title : {modalData?.title}</h2>
                <h2>File Path : {modalData?.filePath}</h2>
              </div>
              <div className="mt-8">
                <p className="font-medium">
                  Are you sure? <span className="text-[#ea4b35]">There is no undo! </span>
                </p>
              </div>
            </div>
          </div>
          <div className="px-5 border-t pt-5  flex gap-5 items-center">
            <button
              onClick={() => {
                handleClose();
                reset();
              }}
              className="border  w-full text-sm py-2 hover:bg-slate-100 rounded-md px-3"
            >
              No, keep the Template
            </button>
            <Button
              loading={isLoading}
              type="button"
              onClick={() => handleRemoveFromSavedItem(modalData?.itemId)}
              className="!bg-[#ea4b35] w-full hover:!bg-[#e93720] !text-white"
            >
              Yes, delete the Template
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveTemplateModal;
