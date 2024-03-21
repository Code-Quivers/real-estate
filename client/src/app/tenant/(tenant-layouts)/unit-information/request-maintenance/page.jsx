"use client";
import AddMaintenanceReqPhotos from "@/components/tenant/maintenanceRequest/AddMaintenanceReqPhotos";
import { MaintenancePriorityType, issueTypes } from "@/constants/maintenanceReqConsts";
import { useAddMaintenanceRequestMutation } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, Radio, RadioGroup, SelectPicker, useToaster } from "rsuite";

const RequestMaintenancePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addMaintenanceRequest, { data, isLoading, isError, isSuccess, error }] = useAddMaintenanceRequestMutation();

  //
  const handleAddRequest = async ({ files, ...reqData }) => {
    const formData = new FormData();
    const obj = JSON.stringify(reqData);
    formData.append("data", obj);
    if (files?.length) formData.append("files", files);

    await addMaintenanceRequest(addMaintenanceRequest);
  };

  //
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && isSuccess && !isError && data) {
      toaster.push(
        <Message centered showIcon type="success" closable>
          {data?.message || "Success"}
        </Message>,
        {
          placement: "topEnd",
          duration: 3000,
        },
      );
    }
    if (!isLoading && !isSuccess && isError && error) {
      toaster.push(
        <Message centered showIcon type="error" closable>
          {error?.message || "Failed to request"}
        </Message>,
        {
          placement: "topEnd",
          duration: 3000,
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, data, toaster]);

  return (
    <section className="max-w-[1050px] mt-6 2xl:mx-auto sm:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
      {/* section title */}
      <div className="flex justify-center mb-5">
        <h2 className="font-semibold text-xl">Request Maintenance</h2>
      </div>
      {/* form */}
      <form onSubmit={handleSubmit(handleAddRequest)}>
        <div className="border p-5 border-[#989898] shadow-lg md:grid md:grid-cols-6 max-md:space-y-5 gap-10 items-end">
          <div className="col-span-4   space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Do you have animals?</h2>
              <div>
                <Controller
                  name="isAnimal"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <RadioGroup defaultValue={false} {...field} className="" name="isAnimal" inline appearance="default">
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </RadioGroup>
                      <Form.ErrorMessage show={(!!errors?.isAnimal && !!errors?.isAnimal?.message) || false} placement="topEnd">
                        {errors?.isAnimal?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="animalDetails"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input className="!w-full" {...field} as="textarea" placeholder="if you have anything to add regarding animals" rows={4} />
                      <Form.ErrorMessage show={(!!errors?.animalDetails && !!errors?.animalDetails?.message) || false} placement="topEnd">
                        {errors?.animalDetails?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Issue Details</h2>
              <div>
                <Controller
                  name="issueLocation"
                  control={control}
                  rules={{
                    required: "issueLocation is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input {...field} className="!w-full" type="text" placeholder="Issue Location" />
                      <Form.ErrorMessage show={(!!errors?.issueLocation && !!errors?.issueLocation?.message) || false} placement="topEnd">
                        {errors?.issueLocation?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            <div>
              <Controller
                name="priority"
                control={control}
                rules={{
                  required: "Priority is required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <SelectPicker {...field} searchable={false} data={MaintenancePriorityType} placeholder="Priority" className="!w-full" />
                    <Form.ErrorMessage show={(!!errors?.priority && !!errors?.priority?.message) || false} placement="topEnd">
                      {errors?.priority?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="issueType"
                control={control}
                rules={{
                  required: "Issue Type is required",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <SelectPicker {...field} placeholder="Issue Type" data={issueTypes} className="!w-full" />
                    <Form.ErrorMessage show={(!!errors?.issueType && !!errors?.issueType?.message) || false} placement="topEnd">
                      {errors?.issueType?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* description */}
            <div>
              <div className="col-span-4">
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "Description is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input as="textarea" {...field} className="!w-full" placeholder="Describe the issue..." rows={6} />
                      <Form.ErrorMessage show={(!!errors?.description && !!errors?.description?.message) || false} placement="topEnd">
                        {errors?.description?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          {/* upload and submit button */}
          <div className="col-span-2">
            <div className="flex flex-col justify-between space-y-5">
              <div className="border">
                <Controller
                  name="files"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <AddMaintenanceReqPhotos field={field} />
                      <Form.ErrorMessage show={(!!errors?.isAnimal && !!errors?.isAnimal?.message) || false} placement="topEnd">
                        {errors?.isAnimal?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div>
                {/* submit button */}
                <Button type="submit" size="lg" className="!bg-[#e22620] !rounded-full !py-3">
                  Send Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RequestMaintenancePage;
