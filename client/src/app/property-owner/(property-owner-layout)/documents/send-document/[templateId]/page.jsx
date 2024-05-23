"use client";

import DigitalSignatureDocumentDrawer from "@/components/property-owner/documents/DigitalSignatureDocumentDrawer";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetSingleDocumentTemplateQuery } from "@/redux/features/documents/documentsApi";
import { useGetMyTenantsQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Loader, SelectPicker } from "rsuite";

const SendDocumentPage = ({ params }) => {
  const { data, isLoading, isError } = useGetSingleDocumentTemplateQuery(
    {
      templateId: params?.templateId,
    },
    {
      skip: !params?.templateId,
    },
  );

  // ! getting my tenants
  const { data: tenantData, isLoading: isTenantDataLoading } = useGetMyTenantsQuery();

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    watch,
  } = useForm();

  // ! handle
  const handleSendDocument = (sendData) => {
    //
  };
  const { propertyId } = watch();
  const selectedTenant = tenantData?.data?.find((single) => single?.propertyId === propertyId);

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-2    2xl:px-0 ">
      <div className="my-5 flex justify-center">
        <h2 className="text-2xl font-semibold">Document Send</h2>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader content="Loading Template..." size="lg" />
        </div>
      )}

      {/* form */}
      {!isLoading && !isError && (
        <div className="bg-white  p-3 md:p-5 lg:p-10 border shadow-lg rounded-xl">
          <form onSubmit={handleSubmit(handleSendDocument)}>
            <div className="space-y-5">
              <div>
                <label htmlFor="tenantId">Select Tenant</label>

                <Controller
                  name="propertyId"
                  control={control}
                  rules={{
                    required: "Tenant is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <SelectPicker
                        searchable
                        data={tenantData?.data?.map((item) => ({
                          label: `${item?.Tenant?.firstName} ${item?.Tenant?.lastName}`,
                          value: item?.propertyId,
                          item: Math.random(),
                          image: item?.Tenant?.profileImage,
                        }))}
                        size="lg"
                        placement="bottom"
                        placeholder="Select..."
                        block
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        renderMenu={isTenantDataLoading}
                        renderMenuItem={(label, other) => (
                          <div className="flex items-start gap-3">
                            <div>
                              <Image
                                className="w-[50px] h-[50px] object-cover rounded-md"
                                width={100}
                                height={100}
                                src={other?.image ? `${fileUrlKey()}/${other?.image}` : ""}
                                alt=""
                              />
                            </div>
                            <div className="space-y-4">
                              <p className="font-semibold">{label}</p>
                            </div>
                          </div>
                        )}
                      />

                      <Form.ErrorMessage show={(!!errors?.propertyId && !!errors?.propertyId?.message) || false} placement="topEnd">
                        {errors?.propertyId?.message}
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
                    value={`${data?.data?.title} - ${selectedTenant?.title ?? ""}`}
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
                <DigitalSignatureDocumentDrawer filePath={data?.data?.filePath} />
                <Form.ErrorMessage show={(!!errors?.templateDocument && !!errors?.templateDocument?.message) || false} placement="topEnd">
                  {errors?.templateDocument?.message}
                </Form.ErrorMessage>
              </div>

              {/* submit button */}
              <div className="mt-10 flex justify-end">
                <Button className="!bg-primary !text-white " size="lg" type="submit">
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default SendDocumentPage;
