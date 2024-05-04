"use client";

import DigitalSignatureDocumentDrawer from "@/components/property-owner/documents/DigitalSignatureDocumentDrawer";
import { useGetSingleDocumentTemplateQuery } from "@/redux/features/documents/documentsApi";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, SelectPicker } from "rsuite";

const SendDocumentPage = ({ params }) => {
  const { data, isLoading } = useGetSingleDocumentTemplateQuery(
    {
      templateId: params?.templateId,
    },
    {
      skip: !params?.templateId,
    },
  );

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();

  // ! handle
  const handleSendDocument = (sendData) => {
    //
  };
  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      <div className="my-5 flex justify-center">
        <h2 className="text-2xl font-semibold">Document Send</h2>
      </div>
      {/* form */}
      <div className="bg-white p-10 border shadow-lg rounded-xl">
        <form onSubmit={handleSubmit(handleSendDocument)}>
          <div className="space-y-5">
            <div>
              <label htmlFor="tenantId">Select Tenant</label>
              <Controller
                name="tenantId"
                control={control}
                rules={{
                  required: "Tenant is required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <SelectPicker
                      size="lg"
                      onChange={(e) => field.onChange(e)}
                      data={["Eugenia", "Bryan", "Linda", "Nancy", "Lloyd", "Alice", "Julia", "Albert"].map((item) => ({ label: item, value: item }))}
                      searchable={false}
                      className="w-full"
                      placeholder="Select Tenant..."
                    />

                    <Form.ErrorMessage show={(!!errors?.tenantId && !!errors?.tenantId?.message) || false} placement="topEnd">
                      {errors?.tenantId?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* title */}
            <div>
              <label htmlFor="title">Title</label>
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
            {/* pdf editable  */}
            <div>
              <Controller
                name="templateDocument"
                control={control}
                rules={{
                  required: "Document Template is required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <DigitalSignatureDocumentDrawer field={field} />
                    <Form.ErrorMessage show={(!!errors?.templateDocument && !!errors?.templateDocument?.message) || false} placement="topEnd">
                      {errors?.templateDocument?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* submit button */}
            <div className="mt-10 flex justify-end">
              <Button className="!bg-primary !text-white " size="lg" type="submit">
                Submit
              </Button>
            </div>{" "}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SendDocumentPage;
