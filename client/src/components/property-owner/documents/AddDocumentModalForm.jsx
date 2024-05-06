"use client";

import { useAddNewDocumentTemplateMutation } from "@/redux/features/documents/documentsApi";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Modal, Notification, useToaster } from "rsuite";
import UploadDocumentTemplate from "./UploadDocumentTemplate";
import { useEffect } from "react";

const AddDocumentModalForm = ({ open, handleClose }) => {
  const [addNewDocumentTemplate, { data, isLoading, isSuccess, isError, error, reset: resetReq }] = useAddNewDocumentTemplateMutation();
  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();
  // submit
  const handleAddNewTemplate = async (templateData) => {
    //

    const formData = new FormData();

    if (templateData?.documentFile) {
      formData.append("file", templateData.documentFile?.blobFile);
    }

    const obj = JSON.stringify({
      title: templateData?.title,
    });
    formData.append("data", obj);

    //
    await addNewDocumentTemplate({
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
            <p className="text-lg font-semibold mb-2">{data?.message || "Successfully Added"}</p>
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
            <p className="text-lg font-semibold mb-2">{error?.message || "Failed to Add"}</p>
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
      <Modal overflow={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add new document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(handleAddNewTemplate)}>
              {/* document title */}
              <div className=" space-y-3">
                <h2>Title</h2>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Document title is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input size="lg" className="!w-full" autoComplete="off" {...field} type="text" placeholder="Document Title..." />
                      <Form.ErrorMessage show={(!!errors?.title && !!errors?.title?.message) || false} placement="topEnd">
                        {errors?.title?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* document file */}
              <div className="mt-3 space-y-3">
                <h2>Document Template (Pdf)</h2>
                <Controller
                  name="documentFile"
                  control={control}
                  rules={{
                    required: "Template is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <UploadDocumentTemplate field={field} />
                      <Form.ErrorMessage show={(!!errors?.documentFile && !!errors?.documentFile?.message) || false} placement="topEnd">
                        {errors?.documentFile?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* submit */}
              <div className="mt-10 flex gap-5 justify-end">
                <button
                  onClick={() => {
                    handleClose();
                    resetForm();
                    resetReq();
                  }}
                >
                  Cancel
                </button>

                <Button loading={isLoading} type="submit" className="!bg-primary !text-white">
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

export default AddDocumentModalForm;
