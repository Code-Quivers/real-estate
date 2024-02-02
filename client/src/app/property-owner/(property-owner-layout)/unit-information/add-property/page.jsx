/* eslint-disable no-unused-vars */
"use client";
import AddPropertyAddPhotos from "@/components/property-owner/add-property/AddPropertyAddPhotos";
import { globalTailwindAnimation } from "@/constants/animation";
import {
  addNewProperty,
  removeProperty,
  updateProperty,
} from "@/redux/features/propertyOwner/addPropertySlice";

import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button, Input, InputNumber, Modal } from "rsuite";
import { IoClose } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";

import { useState } from "react";
import { useAddPropertiesMutation } from "@/redux/features/propertyOwner/propertyApi";

import AddPropertyEditor from "@/components/property-owner/add-property/AddPropertyEditor";

const AddProperty = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const dispatch = useDispatch();
  const propertyList = useAppSelector((state) => state?.propertyList);

  const handleInputChange = (propertyId, field, value) => {
    dispatch(updateProperty({ propertyId, field, value }));
  };
  const handleClose = () => {
    setIsOpenModal(false);
    setModalValue("");
  };
  const [addProperties, { isLoading, isError, isSuccess, error }] =
    useAddPropertiesMutation();

  const handleCreateProperty = async () => {
    // creating form data
    const formData = new FormData();

    const allFiles = (propertyList?.propertyList || [])?.flatMap(
      (property) => property?.files || [],
    );

    const propertiesWithoutFiles = (propertyList?.propertyList || []).map(
      ({ files, ...propertyWithoutFiles }) => propertyWithoutFiles,
    );

    const newPropertyList = JSON.stringify(propertiesWithoutFiles);

    formData.append("data", newPropertyList);

    // Append all files with the same key "files"
    allFiles?.forEach((file, index) => {
      formData.append("files", file, file.name);
    });

    await addProperties({
      data: formData,
    });
  };

  return (
    <>
      <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="  w-full lg:mt-8 items-stretch gap-2 lg:gap-5">
          {/* Property Information */}
          <div className=" flex justify-center  items-stretch gap-5 ">
            <Button
              as={Link}
              href={"/"}
              type="button"
              className={`   h-full  !px-10 !py-2 !bg-[#29429f] !text-white !rounded-full `}
              size="md"
              appearance="default"
            >
              Property <br /> Information
            </Button>
            <Button
              as={Link}
              href={"/"}
              type="button"
              className={`     !px-10 !py-2 !bg-[#29429f] !text-white !rounded-full `}
              size="lg"
              appearance="default"
            >
              Payment
            </Button>
          </div>
          {/* Rental History */}
        </div>

        <div className="mt-5 pb-10">
          <div className="flex justify-center">
            <h4 className="font-medium ">Property Information</h4>
          </div>

          <div className="grid grid-cols-1  gap-10 mt-5">
            {propertyList?.propertyList?.map((property, idx) => (
              <div key={property.id}>
                <div className="pb-2 flex justify-between items-center">
                  <h3 className="font-semibold">Property {idx + 1}</h3>
                  <button
                    onClick={() => {
                      setIsOpenModal(true);
                      setModalValue(property.id);
                    }}
                    className={`border rounded-full p-1 hover:bg-[#29429f] hover:border-transparent hover:text-white flex justify-center items-center  ${globalTailwindAnimation}`}
                  >
                    <IoClose size={30} />
                  </button>
                </div>

                <div className="border rounded-2xl space-y-5 p-4 pt-3 shadow-lg">
                  {/* property Profile ------------------------ */}
                  <div>
                    <div>
                      <h3 className="font-bold">Property Profile</h3>
                    </div>
                    {/*   */}
                    <div className="grid grid-cols-12 gap-10">
                      {/* add photos */}
                      <div className="col-span-4">
                        <div>
                          <label className="text-sm font-medium">
                            Add Photos
                          </label>
                          <div>
                            <AddPropertyAddPhotos property={property} />
                          </div>
                        </div>
                      </div>
                      {/* number of beds and number of baths */}
                      <div className="col-span-2">
                        {/* number of beds */}
                        <div>
                          <label className="text-sm font-medium">
                            Number of Beds
                          </label>
                          <InputNumber
                            min={0}
                            value={property.numOfBed}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "numOfBed",
                                parseInt(value),
                              )
                            }
                          />
                        </div>
                        {/* number of baths */}
                        <div>
                          <label className="text-sm font-medium">
                            Number of Baths
                          </label>
                          <InputNumber
                            min={0}
                            value={property.numOfBath}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "numOfBath",
                                parseInt(value),
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* address and description */}
                      <div className="col-span-6">
                        {/* address */}
                        <div>
                          <label className="text-sm font-medium">Address</label>
                          <Input
                            type="text"
                            value={property.address}
                            onChange={(value) =>
                              handleInputChange(property.id, "address", value)
                            }
                          />
                        </div>
                        {/* description */}
                        <div className="h-[200px]">
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <AddPropertyEditor
                            propertyId={property?.id}
                            value={property?.description}
                            handleInputChange={handleInputChange}
                            field="description"
                          />

                          {/* <Input
                            as="textarea"
                            rows={6}
                            value={property.description}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "description",
                                value,
                              )
                            }
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Maintenance --------------------------------- */}
                  <hr />
                  <div>
                    <div>
                      <h3 className="font-bold">Maintenance</h3>
                    </div>
                    {/*   */}
                    <div className="grid grid-cols-12 gap-10">
                      {/* maintenance covered by tenant */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">
                            Maintenance covered by Tenant
                          </label>
                          <Input
                            as="textarea"
                            rows={8}
                            type="text"
                            value={property.maintenanceCoveredTenant}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "maintenanceCoveredTenant",
                                value,
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* maintenance covered by property owner */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">
                            Maintenance covered by Property Owner
                          </label>
                          <Input
                            as="textarea"
                            rows={8}
                            type="text"
                            value={property.maintenanceCoveredOwner}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "maintenanceCoveredOwner",
                                value,
                              )
                            }
                          />
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
                    <div className="grid grid-cols-12 gap-10">
                      {/* What are the schools next to your house? */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">
                            What are the schools next to your house?
                          </label>
                          {/* <Input
                            as="textarea"
                            rows={8}
                            type="text"
                            value={property.schools}
                            onChange={(value) =>
                              handleInputChange(property.id, "schools", value)
                            }
                          /> */}
                          <AddPropertyEditor
                            propertyId={property?.id}
                            value={property?.schools}
                            handleInputChange={handleInputChange}
                            field="schools"
                          />
                        </div>
                      </div>
                      {/* What are the universities next to your house? */}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">
                            What are the universities next to your house?
                          </label>
                          {/* <Input
                            as="textarea"
                            rows={8}
                            type="text"
                            value={property.universities}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "universities",
                                value,
                              )
                            }
                          /> */}

                          <AddPropertyEditor
                            propertyId={property?.id}
                            value={property?.universities}
                            handleInputChange={handleInputChange}
                            field="universities"
                          />
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
                    <div className="grid grid-cols-12 gap-10">
                      {/* What pets do you allow in your house?*/}
                      <div className="col-span-6">
                        <div>
                          <label className="text-sm font-medium">
                            What pets do you allow in your house?
                          </label>
                          <AddPropertyEditor
                            propertyId={property?.id}
                            value={property?.allowedPets}
                            handleInputChange={handleInputChange}
                            field="allowedPets"
                          />

                          {/* <Input
                            as="textarea"
                            rows={8}
                            type="text"
                            value={property.allowedPets}
                            onChange={(value) =>
                              handleInputChange(
                                property.id,
                                "allowedPets",
                                value,
                              )
                            }
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* button */}
          <div className="mt-10 border w-full flex  flex-col items-center justify-center py-5">
            <div>
              <button
                size="lg"
                onClick={() => {
                  dispatch(addNewProperty());
                }}
                className="flex flex-col items-center space-y-2  justify-center"
              >
                <span
                  className={`border hover:bg-[#333333] hover:border-transparent hover:text-white text-[#333333] rounded-full p-2  ${globalTailwindAnimation}`}
                >
                  <FaPlus size={20} />
                </span>
                <span className="hover:underline text-sm">
                  Add New Property
                </span>
              </button>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Button
              loading={isLoading}
              onClick={handleCreateProperty}
              size="lg"
              className="!bg-[#29429f] !px-12 !rounded-2xl !py-4 !text-white"
            >
              Click
            </Button>
          </div>
        </div>
      </section>
      {/* alert modal */}
      <Modal
        backdrop="static"
        role="alertdialog"
        open={isOpenModal}
        onClose={handleClose}
        size="xs"
      >
        <Modal.Body>
          <div className="px-10 pt-5 ">
            <div className="flex justify-center">
              <span className="rounded-full p-2 bg-[#f8d9db]">
                <PiWarningBold color="#df1140" size={30} />
              </span>
            </div>
            <div className="flex flex-col text-center  w-[80%] mx-auto items-center  justify-center space-y-2">
              <h2 className="text-xl font-semibold"> Are you sure ?</h2>
              <p className=" text-sm  text-[#7c838a] font-sans ">
                This action cannot be undone. All values associated with this
                field will be lost.
              </p>
            </div>

            <div className="space-y-2.5 mt-5">
              <button
                onClick={() => {
                  dispatch(removeProperty(modalValue));
                  setIsOpenModal(false);
                }}
                className="bg-[#e42451] hover:bg-[#df1140] py-2 text-white  rounded-lg w-full duration-300"
              >
                Delete Property
              </button>
              <button
                onClick={handleClose}
                className="border py-2 font-medium hover:bg-gray-100  rounded-lg w-full"
              >
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
