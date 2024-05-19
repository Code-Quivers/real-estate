"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Form, Modal, Notification, useToaster } from "rsuite";
import { useUpdateAnnualTaxDocumentDataMutation } from "@/redux/features/reports/reportsApi";
import UpdateTaxFileUpload from "./UpdateTaxFileUpload";

const EditAnnualTaxDocumentModal = ({ reportData, isOpen, handleClose }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm();

  //  add new monthly or annual report
  const [updateAnnualTaxDocumentData, { data, isLoading, isError, isSuccess, error, reset: resetReq }] = useUpdateAnnualTaxDocumentDataMutation();

  // submit
  const handleUpdateReport = async (postData) => {
    const formData = new FormData();

    if (postData?.documentFile) {
      formData.append("file", postData?.documentFile?.blobFile);
    }

    //

    await updateAnnualTaxDocumentData({
      data: formData,
      reportId: reportData?.reportId,
    });
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{data?.message || "Successfully Updated"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      handleClose();
      resetForm();
      resetReq();
    }
    if (!isLoading && isError && !isSuccess && error) {
      toaster.push(
        <Notification type="error" header="Error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message || "Failed to  Update"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, toaster]);

  return (
    <div>
      <Modal
        size="md"
        onClose={() => {
          handleClose();
          resetForm();
        }}
        overflow={false}
        open={isOpen}
      >
        <Modal.Body>
          {/* heading title */}
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Edit Report Details</h2>
            <button
              onClick={() => {
                handleClose();
                resetForm();
              }}
              className="hover:scale-125 duration-300"
            >
              <IoClose size={20} />
            </button>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit(handleUpdateReport)}>
            <div className="my-5 space-y-5">
              <div className="space-y-2 pb-2">
                <label htmlFor="reportType">Select Pdf Document</label>
                <div>
                  <Controller
                    name="documentFile"
                    control={control}
                    rules={{
                      required: "Document File is Required !",
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <UpdateTaxFileUpload defaultValue={reportData} field={field} control={control} />
                        <Form.ErrorMessage show={(!!errors?.documentFile && !!errors?.documentFile?.message) || false} placement="topEnd">
                          {errors?.documentFile?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* submit or cancel */}
            <div className="flex justify-end items-center gap-5">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  resetForm();
                }}
                className="hover:underline"
              >
                Close
              </button>

              <Button loading={isLoading} type="submit" className="!bg-primary !text-white !rounded-full !px-5 !py-2.5">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditAnnualTaxDocumentModal;
