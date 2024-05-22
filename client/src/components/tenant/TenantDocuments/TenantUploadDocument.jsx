"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Form, Modal, Notification, SelectPicker, useToaster } from "rsuite";
import UploadTenantDocument from "./UploadTenantDocument";
import { useSendSignedDocumentMutation } from "@/redux/features/documents/documentsApi";
import { useEffect, useState } from "react";

const TenantUploadDocument = ({ allDocuments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [sendSignedDocument, { data, isLoading, isSuccess, isError, error, reset: resetReq }] = useSendSignedDocumentMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();
  // handler function
  const handleUploadSignedDocument = async (updatedFileData) => {
    const selectedDocument = allDocuments?.find((doc) => doc?.documentId === updatedFileData?.documentId);

    const formData = new FormData();
    if (updatedFileData?.documentFile?.blobFile) {
      formData.append("file", updatedFileData?.documentFile?.blobFile);
    }

    // after
    const obj = {
      documentId: updatedFileData?.documentId,
      documentTitle: `${selectedDocument?.documentTitle} - Signed`,
    };
    // creating form data

    const objJson = JSON.stringify(obj);
    formData.append("data", objJson);

    //
    await sendSignedDocument({
      data: formData,
    });
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{data?.message || "Successfully Sent"}</p>
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
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message || "Failed to Send  "}</p>
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
      <div className="flex justify-center">
        <Button onClick={() => setIsOpen(true)} size="lg" className="!bg-primary !text-white !rounded-full">
          Upload Document
        </Button>
      </div>

      <Modal overflow={false} size="md" open={isOpen} onClose={handleClose}>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleUploadSignedDocument)}>
              {/* Select Document */}
              <div className="mt-3 space-y-3">
                <label htmlFor="documentId">Select Document</label>
                <Controller
                  name="documentId"
                  control={control}
                  rules={{
                    required: "Document is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <SelectPicker
                        searchable
                        data={
                          allDocuments?.map((item) => ({
                            label: item?.documentTitle,
                            value: item?.documentId,
                          })) || []
                        }
                        size="lg"
                        placement="bottom"
                        placeholder="Select..."
                        block
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />

                      <Form.ErrorMessage show={(!!errors?.documentId && !!errors?.documentId?.message) || false} placement="topEnd">
                        {errors?.documentId?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* document file */}
              <div className="mt-3 space-y-3 min-h-[20vh]">
                <label htmlFor="documentFile">Select your Signed Document</label>
                <Controller
                  name="documentFile"
                  control={control}
                  rules={{
                    required: "Template is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper  ">
                      <UploadTenantDocument field={field} />

                      <Form.ErrorMessage show={(!!errors?.documentFile && !!errors?.documentFile?.message) || false} placement="topEnd">
                        {errors?.documentFile?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div className="flex mt-5 justify-end">
                <Button
                  onClick={() => {
                    handleClose();
                    resetForm();
                    resetReq();
                  }}
                >
                  Close
                </Button>
                <Button loading={isLoading} type="submit" className="!bg-primary !text-white ">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TenantUploadDocument;
