/* eslint-disable no-unused-vars */
"use client";
import AddPropertyUploadPhotos from "@/components/property-owner/add-property/AddPropertyUploadPhotos";
import { globalTailwindAnimation } from "@/constants/animation";
import { FaPlus } from "react-icons/fa";
import { Button, Form, Input, InputNumber, Message, Modal, Notification, useToaster } from "rsuite";
import { IoClose } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useAddPropertiesMutation } from "@/redux/features/propertyOwner/propertyApi";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const AddProperty = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const toaster = useToaster();
  const router = useRouter();

  // ! ===============================

  const handleClose = () => {
    setIsOpenModal(false);
    setModalValue("");
  };
  const [addProperties, { isLoading, isError, isSuccess, error, reset: resetReq, data }] = useAddPropertiesMutation();

  // ! side effect
  useEffect(() => {
    if (!isLoading && !isError && isSuccess && !error) {
      toaster.push(
        <Notification header="Success" type="success" closable>
          {data?.message || "Successfully Created"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );

      router.push(`/property-owner/unit-information/payment/${data?.data?.orderId}`);
      resetReq();
    }
    if (!isLoading && isError && !isSuccess) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          {error?.message || "Failed to Create"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, router, resetReq, toaster]);

  // !---------------------------------------------------------------------------

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });

  const handleSubmitCreateUnit = async (dataGet) => {
    const formData = new FormData();
    const allFiles = (dataGet?.properties || [])?.flatMap((property) => property?.files || []);
    const propertiesWithoutFiles = (dataGet?.properties || []).map(({ files, ...propertyWithoutFiles }) => {
      return {
        ...propertyWithoutFiles,
        numOfBed: parseFloat(propertyWithoutFiles?.numOfBed),
        numOfBath: parseFloat(propertyWithoutFiles?.numOfBath),
        monthlyRent: parseFloat(propertyWithoutFiles?.monthlyRent),
      };
    });

    const newPropertyList = JSON.stringify(propertiesWithoutFiles);

    formData.append("data", newPropertyList);
    // Append all files with the same key "files"
    allFiles?.forEach((file, index) => {
      formData.append("files", file, file?.name);
    });

    await addProperties({
      data: formData,
    });
  };

  const removeProperty = (id) => {
    const index = fields.findIndex((property) => property.id === id);
    if (index !== -1) {
      remove(index);
      setIsOpenModal(false);
    }
  };

  return (
    <>
      <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="  w-full lg:mt-8 items-stretch gap-2 lg:gap-5">
          {/* Property Information */}
          <div className=" flex justify-center  items-stretch gap-5 ">
            <Button type="button" className={`h-full  !px-10 !py-2 !bg-[#29429f] !text-white !rounded-full `} size="md" appearance="default">
              Property Information
            </Button>
            <Button type="button" className={`     !px-10 !py-2 !bg-[#29429f] !text-white !rounded-full `} size="lg" appearance="default">
              Payment
            </Button>
          </div>
        </div>
        {/*  forms*/}
        <div className="mt-5 pb-10">
          {/* Section title */}
          <div className="flex justify-center">
            <h4 className="font-medium ">Property Information</h4>
          </div>
          {/* main section */}
          <form onSubmit={handleSubmit(handleSubmitCreateUnit)}>
            <div className="space-y-5 mt-5">
              {fields?.map((property, idx) => (
                <div key={property.id}>
                  <div className=" flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Property {idx + 1}</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalValue(property.id);
                      }}
                      className={`border rounded-full p-1 hover:bg-[#29429f] hover:border-transparent hover:text-white flex justify-center items-center  ${globalTailwindAnimation}`}
                    >
                      <IoClose size={30} />
                    </button>
                  </div>
                  {/* other */}

                  <div className=" space-y-5 ">
                    {/* property Profile ------------------------ */}
                    <div>
                      <div>
                        <h3 className="font-bold text-center mb-2">Property Profile</h3>
                      </div>
                      {/*   */}
                      <div className="lg:grid lg:grid-cols-12 gap-5">
                        {/* add photos */}
                        <div className=" md:col-span-6">
                          <div>
                            <label className="text-sm font-medium">Add Photos</label>
                            <div>
                              <Controller
                                name={`properties[${idx}].files`}
                                control={control}
                                rules={{ required: "Images is required" }}
                                render={({ field }) => (
                                  <div className="rs-form-control-wrapper  ">
                                    <AddPropertyUploadPhotos field={field} propertyId={property?.fieldId} />
                                    <Form.ErrorMessage show={!!errors?.properties?.[idx]?.files} placement="topEnd">
                                      {errors?.properties?.[idx]?.files?.message}
                                    </Form.ErrorMessage>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        {/* address  && title */}
                        <div className="max-lg:space-y-4 md:col-span-6">
                          {/* title */}
                          <div className="space-y-4 lg:space-y-2 max-lg:mt-5 ">
                            <label className="text-sm font-medium">Title</label>
                            <div>
                              <Controller
                                name={`properties[${idx}].title`}
                                control={control}
                                rules={{ required: "Title is required" }}
                                render={({ field }) => (
                                  <div className="rs-form-control-wrapper ">
                                    <Input className="!w-full" {...field} type="text" />
                                    <Form.ErrorMessage show={!!errors?.properties?.[idx]?.title} placement="topEnd">
                                      {errors?.properties?.[idx]?.title?.message}
                                    </Form.ErrorMessage>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                          {/* address */}
                          <div className="space-y-4 lg:space-y-2">
                            <label className="text-sm font-medium">Address</label>
                            <div>
                              <Controller
                                name={`properties[${idx}].address`}
                                control={control}
                                rules={{ required: "Address is required" }}
                                render={({ field }) => (
                                  <div className="rs-form-control-wrapper">
                                    <Input className="!w-full" {...field} type="text" />
                                    <Form.ErrorMessage show={errors?.properties?.[idx]?.address !== undefined} placement="topEnd">
                                      {errors?.properties?.[idx]?.address?.message}
                                    </Form.ErrorMessage>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        {/* description */}
                        <div className="lg:col-span-12">
                          <div className="max-lg:space-y-3">
                            <label className="text-sm font-medium">Description</label>
                            <Controller
                              name={`properties[${idx}].description`}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper mt-1">
                                  <Input as="textarea" rows={6} {...field} className="!w-full" />
                                  <Form.ErrorMessage show={errors?.properties?.[idx]?.description !== undefined} placement="topEnd">
                                    {errors?.properties?.[idx]?.description?.message}
                                  </Form.ErrorMessage>
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        {/* number of beds and number of baths  && monthly rent*/}
                        <div className="lg:col-span-12">
                          <div className="lg:grid lg:grid-cols-3 gap-5 max-lg:space-y-3 ">
                            {/* number of beds */}
                            <div className="w-full max-lg:space-y-3">
                              <label className="text-sm font-medium">Number of Beds</label>

                              <Controller
                                rules={{
                                  required: "Num Of Beds is Required",
                                }}
                                name={`properties[${idx}].numOfBed`}
                                control={control}
                                render={({ field }) => (
                                  <div className="rs-form-control-wrapper mt-1">
                                    <InputNumber
                                      className="!w-full"
                                      min={0}
                                      max={99}
                                      {...field}
                                      // onChange={(e) => {
                                      //   field.onChange(parseFloat(e));
                                      // }}
                                    />
                                    <Form.ErrorMessage show={errors?.properties?.[idx]?.numOfBed !== undefined} placement="topEnd">
                                      {errors?.properties?.[idx]?.numOfBed?.message}
                                    </Form.ErrorMessage>
                                  </div>
                                )}
                              />
                            </div>
                            {/* number of baths */}
                            <div className="w-full max-lg:space-y-3">
                              <label className="text-sm font-medium">Number of Baths</label>
                              <Controller
                                rules={{
                                  required: "Num Of Bath is Required",
                                }}
                                name={`properties[${idx}].numOfBath`}
                                control={control}
                                render={({ field }) => (
                                  <div className="rs-form-control-wrapper mt-1">
                                    <InputNumber
                                      {...field}
                                      // onChange={(e) => {
                                      //   field.onChange(parseFloat(e));
                                      // }}
                                      className="!w-full"
                                      min={0}
                                      max={99}
                                    />
                                    <Form.ErrorMessage show={errors?.properties?.[idx]?.numOfBath !== undefined} placement="topEnd">
                                      {errors?.properties?.[idx]?.numOfBath?.message}
                                    </Form.ErrorMessage>
                                  </div>
                                )}
                              />
                            </div>
                            {/* Price of Property */}
                            <div className="w-full max-lg:space-y-3">
                              <label className="text-sm font-medium">Monthly Rent $</label>

                              <Controller
                                rules={{
                                  required: "Monthly Rent is Required",
                                }}
                                name={`properties[${idx}].monthlyRent`}
                                control={control}
                                render={({ field }) => (
                                  <div className="rs-form-control-wrapper mt-1">
                                    <InputNumber
                                      {...field}
                                      // onChange={(e) => {
                                      //   field.onChange(parseFloat(e));
                                      // }}
                                      className="!w-full"
                                      min={1}
                                      max={999999}
                                    />
                                    <Form.ErrorMessage show={errors?.properties?.[idx]?.monthlyRent !== undefined} placement="topEnd">
                                      {errors?.properties?.[idx]?.monthlyRent?.message}
                                    </Form.ErrorMessage>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Maintenance --------------------------------- */}
                    <hr />
                    <div>
                      <div>
                        <h3 className="font-bold text-lg text-center mb-2">Maintenance</h3>
                      </div>
                      {/*   */}
                      <div className="grid lg:grid-cols-12 gap-5">
                        {/* maintenance covered by tenant */}
                        <div className="col-span-6">
                          <div>
                            <label className="text-sm font-medium">Maintenance covered by Tenant</label>
                            <Controller
                              rules={{
                                required: "Maintenance Covered By Tenant is Required",
                              }}
                              name={`properties[${idx}].maintenanceCoveredTenant`}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper mt-1">
                                  <Input as="textarea" rows={6} {...field} className="!w-full" />
                                  <Form.ErrorMessage show={errors?.properties?.[idx]?.maintenanceCoveredTenant !== undefined} placement="topEnd">
                                    {errors?.properties?.[idx]?.maintenanceCoveredTenant?.message}
                                  </Form.ErrorMessage>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        {/* maintenance covered by property owner */}
                        <div className="col-span-6">
                          <div>
                            <label className="text-sm font-medium">Maintenance covered by Property Owner</label>
                            <Controller
                              rules={{
                                required: "Maintenance Covered By Owner is Required",
                              }}
                              name={`properties[${idx}].maintenanceCoveredOwner`}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper mt-1">
                                  <Input as="textarea" rows={6} {...field} className="!w-full" />
                                  <Form.ErrorMessage show={errors?.properties?.[idx]?.maintenanceCoveredOwner !== undefined} placement="topEnd">
                                    {errors?.properties?.[idx]?.maintenanceCoveredOwner?.message}
                                  </Form.ErrorMessage>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* Schools --------------------------------- */}
                    <div>
                      <div>
                        <h3 className="font-bold text-center text-lg mb-2">Schools</h3>
                      </div>
                      {/*   */}
                      <div className="grid lg:grid-cols-12 gap-10">
                        {/* What are the schools next to your house? */}
                        <div className="col-span-6">
                          <div>
                            <label className="text-sm font-medium">What are the schools next to your house?</label>
                            <Controller
                              name={`properties[${idx}].schools`}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper mt-1">
                                  <Input as="textarea" rows={6} {...field} className="!w-full" />
                                  <Form.ErrorMessage show={errors?.properties?.[idx]?.schools !== undefined} placement="topEnd">
                                    {errors?.properties?.[idx]?.schools?.message}
                                  </Form.ErrorMessage>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        {/* What are the universities next to your house? */}
                        <div className="col-span-6">
                          <div>
                            <label className="text-sm font-medium">What are the universities next to your house?</label>
                            <Controller
                              name={`properties[${idx}].universities`}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper mt-1">
                                  <Input as="textarea" rows={6} {...field} className="!w-full" />
                                  <Form.ErrorMessage show={errors?.properties?.[idx]?.universities !== undefined} placement="topEnd">
                                    {errors?.properties?.[idx]?.universities?.message}
                                  </Form.ErrorMessage>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* Pets --------------------------------- */}
                    <div>
                      <div>
                        <h3 className="font-bold text-lg text-center mb-2">Pets</h3>
                      </div>
                      {/*   */}
                      <div className="grid lg:grid-cols-12 gap-10">
                        {/* What pets do you allow in your house?*/}
                        <div className="col-span-6">
                          <div>
                            <label className="text-sm font-medium">What pets do you allow in your house?</label>
                            <Controller
                              name={`properties[${idx}].allowedPets`}
                              control={control}
                              render={({ field }) => (
                                <div className="rs-form-control-wrapper mt-1">
                                  <Input as="textarea" rows={6} {...field} className="!w-full" />
                                  <Form.ErrorMessage show={errors?.properties?.[idx]?.allowedPets !== undefined} placement="topEnd">
                                    {errors?.properties?.[idx]?.allowedPets?.message}
                                  </Form.ErrorMessage>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* button */}
            {/*  add new property field */}
            <div className="mt-10 border w-full flex  flex-col items-center justify-center py-5">
              <div>
                <button
                  type="button"
                  size="lg"
                  onClick={() => {
                    append({
                      fieldId: new Date().getTime(),
                      numOfBed: 0,
                      numOfBath: 0,
                      monthlyRent: 1,
                      address: "",
                      description: "",
                      maintenanceCoveredTenant: "",
                      maintenanceCoveredOwner: "",
                      schools: "",
                      universities: "",
                      allowedPets: "",
                      files: [],
                    }); // Append a new property
                  }}
                  className="flex flex-col items-center space-y-2  justify-center"
                >
                  <span
                    className={`border hover:bg-[#333333] hover:border-transparent hover:text-white text-[#333333] rounded-full p-2  ${globalTailwindAnimation}`}
                  >
                    <FaPlus size={20} />
                  </span>
                  <span className="hover:underline text-sm">Add New Property</span>
                </button>
              </div>
            </div>
            {/* submit */}

            <div className="mt-10 flex justify-end">
              <Button
                disabled={!fields?.length > 0}
                type="submit"
                loading={isLoading}
                size="lg"
                className="!bg-[#29429f] !px-12 !rounded-2xl !py-4 !text-white"
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </section>
      {/* delete alert modal */}
      <Modal backdrop="static" overflow={false} role="alertdialog" open={isOpenModal} onClose={handleClose} size="xs">
        <Modal.Body>
          <div className="px-10 pt-5 ">
            <div className="flex justify-center">
              <span className="rounded-full p-2 bg-[#f8d9db]">
                <PiWarningBold color="#df1140" size={30} />
              </span>
            </div>
            <div className="flex flex-col text-center  w-[80%] mx-auto items-center  justify-center space-y-2">
              <h2 className="text-xl font-semibold"> Are you sure ?</h2>
              <p className=" text-sm  text-[#7c838a] font-sans ">This action cannot be undone. All values associated with this field will be lost.</p>
            </div>

            <div className="space-y-2.5 mt-5">
              <button
                onClick={() => removeProperty(modalValue)}
                type="button"
                className="bg-[#e42451] hover:bg-[#df1140] py-2 text-white  rounded-lg w-full duration-300"
              >
                Delete Property
              </button>
              <button onClick={handleClose} className="border py-2 font-medium hover:bg-gray-100  rounded-lg w-full">
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProperty;
