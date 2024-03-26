"use client";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Form, Input, InputNumber, Message, Modal, useToaster } from "rsuite";
import UpdateImageUpload from "./UpdateImageUpload";
import EditPropertyEditor from "./EditPropertyEditor";
import { useUpdatePropertyMutation } from "@/redux/features/propertyOwner/propertyApi";
import { fileUrlKey } from "@/configs/envConfig";
import { useEffect } from "react";

const UnitEditModal = ({ open, handleClose, editData }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      // description: editData?.description,
      // universities: editData?.universities,
      schools: editData?.schools,
      // allowedPets: editData?.allowedPets,
    },
  });

  const [updateProperty, { isLoading, isError, isSuccess, error, reset: resetReq, data: updateResData }] = useUpdatePropertyMutation();

  const handleUpdateProperty = async (updatedData) => {
    // creating form data
    const { files, ...restData } = updatedData;
    const formData = new FormData();

    // // Handle files
    const oldFiles = [];
    files?.forEach((file) => {
      if (file.url) {
        const fileUrl = fileUrlKey();
        let fileName = file.url.split(fileUrl)[1];
        if (fileName.startsWith("//")) {
          fileName = fileName.substring(2);
        } else {
          fileName = fileName.substring(1);
        }
        oldFiles.push(fileName);
      } else {
        formData.append("files", file.blobFile, file.name);
      }
    });

    // Prepare data object
    const data = {};
    for (const [key, value] of Object.entries(restData)) {
      if (value) {
        if (key === "monthlyRent" || key === "numOfBath" || key === "numOfBed") {
          data[key] = parseInt(value);
        } else {
          data[key] = value;
        }
      }
    }
    if (oldFiles.length > 0) data["images"] = oldFiles;

    const propertyId = editData?.propertyId || null;
    formData.append("data", JSON.stringify(data));

    await updateProperty({
      propertyId: propertyId,
      data: formData,
    });
  };

  // !
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && updateResData) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold xl:text-2xl">{updateResData?.message ?? "Successfully Updated"}</h4>
        </Message>,
        { placement: "topEnd", duration: 20000 },
      );
      handleClose();
      resetReq();
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        <Message bordered centered showIcon type="error" closable>
          <h4 className="font-semibold xl:text-2xl">
            {" "}
            {
              // @ts-ignore
              error?.message || "Update Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 20000 },
      );
    }
  }, [isSuccess, isLoading, isError, updateResData, error, toaster]);

  return (
    <div>
      <Modal
        size="xl"
        dialogAs="div"
        overflow={false}
        className="!max-w-7xl bg-white border rounded-xl
       mx-auto w-full  mt-2 2xl:mt-5 "
        open={open}
        onClose={() => {
          handleClose();
          resetForm();
        }}
      >
        <Modal.Body className=" ">
          <div className="flex px-5 justify-between items-center">
            <h3 className="text-lg font-semibold">Edit Unit Information</h3>
            <button
              className="hover:text-rose-600 hover:scale-125 duration-300 transition-all "
              onClick={() => {
                handleClose();
                resetForm();
              }}
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="p-5">
            <form onSubmit={handleSubmit(handleUpdateProperty)}>
              <div className="lg:grid lg:grid-cols-6 space-y-3">
                <div className="lg:col-span-3">
                  <div className="rs-form-control-wrapper ">
                    <label htmlFor="">House Images</label>
                    <div>
                      <UpdateImageUpload setValue={setValue} control={control} images={editData?.images} />
                    </div>
                  </div>
                </div>
                {/* description */}
                <div className="lg:col-span-3">
                  {/*  beds baths rent*/}
                  <div className="col-span-6">
                    {/* number of beds and number of baths */}
                    <div className="md:grid  md:grid-cols-2 lg:grid-cols-3 items-center  lg:gap-10 ">
                      {/* number of beds */}
                      <div className="w-full">
                        <label className="text-sm font-medium">Number of Beds</label>

                        <Controller
                          name="numOfBed"
                          control={control}
                          rules={{
                            min: {
                              value: 0,
                              message: "Num of Bed must be getter than 0",
                            },
                          }}
                          render={({ field }) => (
                            <div className="rs-form-control-wrapper ">
                              <InputNumber className="!w-full" {...field} min={0} defaultValue={editData?.numOfBed} />{" "}
                              <Form.ErrorMessage show={(!!errors?.numOfBed && !!errors?.numOfBed?.message) || false} placement="topEnd">
                                {errors?.numOfBed?.message}
                              </Form.ErrorMessage>
                            </div>
                          )}
                        />
                      </div>
                      {/* number of baths */}
                      <div className="w-full">
                        <label className="text-sm font-medium">Number of Baths</label>
                        <Controller
                          name="numOfBath"
                          control={control}
                          rules={{
                            min: {
                              value: 0,
                              message: "Num of Bath must be getter than 0",
                            },
                          }}
                          render={({ field }) => (
                            <div className="rs-form-control-wrapper ">
                              <InputNumber className="!w-full  " {...field} min={0} defaultValue={editData?.numOfBath} />{" "}
                              <Form.ErrorMessage show={(!!errors?.numOfBath && !!errors?.numOfBath?.message) || false} placement="topEnd">
                                {errors?.numOfBath?.message}
                              </Form.ErrorMessage>
                            </div>
                          )}
                        />
                      </div>
                      {/* Price of Property */}
                      <div className="w-full">
                        <label className="text-sm font-medium">Monthly Rent $</label>

                        <Controller
                          name="monthlyRent"
                          control={control}
                          rules={{
                            min: {
                              value: 1,
                              message: "Monthly Rent must be getter than 0",
                            },
                          }}
                          render={({ field }) => (
                            <div className="rs-form-control-wrapper ">
                              <InputNumber className="!w-full" {...field} min={0} defaultValue={editData?.monthlyRent} />
                              <Form.ErrorMessage show={(!!errors?.monthlyRent && !!errors?.monthlyRent?.message) || false} placement="topEnd">
                                {errors?.monthlyRent?.message}
                              </Form.ErrorMessage>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address and description */}

                <div className="col-span-6">
                  <div>
                    <label htmlFor="">Title</label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <Input defaultValue={editData?.title} className="!w-full" {...field} type="text" placeholder="Title..." />
                        </div>
                      )}
                    />
                  </div>
                  {/* Address */}
                  <div>
                    <label htmlFor="">Address</label>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <Input defaultValue={editData?.address} className="!w-full" {...field} type="text" placeholder="Address..." />
                        </div>
                      )}
                    />
                  </div>

                  {/* description */}
                  <div className="">
                    <label className="text-sm font-medium">Description</label>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={editData?.description}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper">
                          <EditPropertyEditor field={field} defaultValue={editData?.description} />
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* maintenance  */}

                <div className="col-span-6 space-y-2.5">
                  {/* Maintenance --------------------------------- */}
                  <hr />
                  <div className="mt-2">
                    <div>
                      <h3 className="font-bold">Maintenance</h3>
                    </div>
                    {/*   */}
                    <div className="grid lg:grid-cols-12 gap-10">
                      {/* maintenance covered by tenant */}
                      <div className="col-span-6">
                        <div className="">
                          <label className="text-sm font-medium">Maintenance covered by Tenant</label>
                          <Controller
                            name="maintenanceCoveredTenant"
                            control={control}
                            render={({ field }) => (
                              <div className="rs-form-control-wrapper">
                                <Input
                                  className="!w-full"
                                  {...field}
                                  as="textarea"
                                  rows={4}
                                  type="text"
                                  defaultValue={editData?.maintenanceCoveredTenant}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      {/* maintenance covered by property owner */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">Maintenance covered by Property Owner</label>
                          <div className="w-full  ">
                            <Controller
                              name="maintenanceCoveredOwner"
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper">
                                  <Input
                                    className="!w-full"
                                    {...field}
                                    as="textarea"
                                    rows={4}
                                    type="text"
                                    defaultValue={editData?.maintenanceCoveredOwner}
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <hr />
                  {/* Schools --------------------------------- */}
                  <div>
                    <div>
                      <h3 className="font-bold">Schools</h3>
                    </div>
                    {/*   */}
                    <div className="grid lg:grid-cols-12 gap-10">
                      {/* What are the schools next to your house? */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">What are the schools next to your house?</label>

                          <div className="w-full  ">
                            <Controller
                              name="schools"
                              // defaultValue={editData?.schools}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper">
                                  <EditPropertyEditor field={field} defaultValue={editData?.schools} />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      {/* What are the universities next to your house? */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">What are the universities next to your house?</label>

                          <div className="w-full  ">
                            <Controller
                              name="universities"
                              defaultValue={editData?.universities}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper">
                                  <EditPropertyEditor field={field} defaultValue={editData?.universities} />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/* Pets --------------------------------- */}
                  <div>
                    <div>
                      <h3 className="font-bold">Pets</h3>
                    </div>
                    {/*   */}
                    <div className="grid lg:grid-cols-12 gap-10">
                      {/* What pets do you allow in your house?*/}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">What pets do you allow in your house?</label>
                          <div className="w-full  ">
                            <Controller
                              name="allowedPets"
                              defaultValue={editData?.allowedPets}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper">
                                  <EditPropertyEditor field={field} defaultValue={editData?.allowedPets} />
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className=" max-lg:mt-3 flex justify-end gap-3 items-center">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    resetForm();
                  }}
                  className=" border hover:bg-primary/80 hover:text-white hover:border-transparent duration-300 transition-all  border-primary text-primary py-2 px-3 rounded-full"
                >
                  Cancel
                </button>
                <Button loading={isLoading} type="submit" className="!bg-primary !border !border-transparent !text-white !py-3 !px-8 !rounded-full">
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

export default UnitEditModal;
