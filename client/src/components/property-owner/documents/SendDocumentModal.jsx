"use client";

import { useGetMyAllDocumentTemplatesQuery, useSendDocumentTemplateMutation } from "@/redux/features/documents/documentsApi";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Loader, Modal, Notification, SelectPicker, useToaster } from "rsuite";
import DigitalSignatureDocumentDrawer from "./DigitalSignatureDocumentDrawer";
import { fileUrlKey } from "@/configs/envConfig";
import { useEffect } from "react";

const SendDocumentModal = ({ open, handleClose, sendModalData }) => {
  const { data, isLoading } = useGetMyAllDocumentTemplatesQuery();
  const [
    sendDocumentTemplate,
    { data: dataSend, isLoading: isLoadingSend, isError: isErrorSend, error: errorSend, isSuccess: isSuccessSend, reset: resetReq },
  ] = useSendDocumentTemplateMutation();
  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    watch,
  } = useForm();
  const { templatePath } = watch();
  const selectedTemplate = data?.data?.find((temp) => temp?.filePath === templatePath);

  // ! handle
  const handleSendDocument = async (sendData) => {
    //

    try {
      const response = await fetch(`${fileUrlKey()}/${sendData?.templatePath}`);
      const fileData = await response.blob();
      const fileContent = new File([fileData], `${selectedTemplate?.title}-${sendModalData?.title}.pdf`, {
        type: "application/pdf",
      });

      // after
      const obj = {
        tenantId: sendModalData?.Tenant?.tenantId,
        propertyId: sendModalData?.propertyId,
        title: `${selectedTemplate?.title || ""}-${sendModalData?.title}`,
      };
      // creating form data
      const formData = new FormData();
      const objJson = JSON.stringify(obj);
      formData.append("data", objJson);
      if (fileContent) {
        formData.append("file", fileContent);
      }

      // after
      await sendDocumentTemplate({
        data: formData,
      });
    } catch (error) {
      console.error("Error fetching PDF file:", error);
    }
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoadingSend && !isErrorSend && isSuccessSend) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{dataSend?.message || "Successfully Sent"}</p>
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
    if (!isLoadingSend && isErrorSend && !isSuccessSend && errorSend) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{errorSend?.message || "Failed to Send"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingSend, isErrorSend, isSuccessSend, errorSend, toaster]);

  return (
    <div>
      <Modal size="full" overflow={false} open={open} onClose={handleClose}>
        <Modal.Body>
          <section className="max-w-[1050px]    mb-5 mx-auto md:px-3 lg:px-5 px-2    2xl:px-0 ">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold">Document Send</h2>
            </div>
            {isLoading && (
              <div className="flex justify-center items-center min-h-[50vh]">
                <Loader content="Loading Template..." size="lg" />
              </div>
            )}

            {/* form */}

            <div className="bg-white  ">
              <form onSubmit={handleSubmit(handleSendDocument)}>
                <div className="space-y-7">
                  <div>
                    <label htmlFor="templatePath">Select Document Template</label>

                    <Controller
                      name="templatePath"
                      control={control}
                      rules={{
                        required: "Template is required",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <SelectPicker
                            searchable
                            data={data?.data?.map((item) => ({
                              label: item?.title,
                              value: item?.filePath,
                            }))}
                            size="lg"
                            placement="bottom"
                            placeholder="Select..."
                            block
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />

                          <Form.ErrorMessage show={(!!errors?.templatePath && !!errors?.templatePath?.message) || false} placement="topEnd">
                            {errors?.templatePath?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* title */}
                  <div>
                    <label htmlFor="title">Title</label>

                    <div className="rs-form-control-wrapper ">
                      <Input
                        value={`${selectedTemplate?.title || ""}-${sendModalData?.title}`}
                        size="lg"
                        className="!w-full"
                        autoComplete="off"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                  {/* pdf  View  */}
                  <div>
                    {selectedTemplate?.filePath ? (
                      <DigitalSignatureDocumentDrawer filePath={selectedTemplate?.filePath} />
                    ) : (
                      <div className="flex justify-center  border p-3 rounded-lg">
                        <h2>No Template Selected</h2>
                      </div>
                    )}
                  </div>

                  {/* submit button */}
                  <div className="mt-10 flex justify-end gap-5">
                    <button type="button" onClick={handleClose}>
                      Cancel
                    </button>
                    <Button className="!bg-primary !text-white " size="lg" type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SendDocumentModal;
