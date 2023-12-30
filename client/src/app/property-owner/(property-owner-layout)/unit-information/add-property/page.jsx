"use client";
import AddPropertyAddPhotos from "@/components/property-owner/add-property/AddPropertyAddPhotos";
import { globalTailwindAnimation } from "@/constants/animation";
import {
  addNewProperty,
  updateProperty,
} from "@/redux/features/propertyOwner/addPropertySlice";
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button, Input, InputNumber } from "rsuite";

const TenantPetsInformationEdit = () => {
  const dispatch = useDispatch();
  const propertyList = useAppSelector(
    (state) => state?.propertyList?.propertyList,
  );

  const handleInputChange = (propertyId, field, value) => {
    dispatch(updateProperty({ propertyId, field, value }));
  };

  return (
    <section className="max-w-[1050px] bg-white max-lg:px-3 pb-20 mx-auto mb-5 mt-6 2xl:mx-auto lg:px-5 2xl:px-0">
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
          {propertyList?.map((property) => (
            <div key={property.id}>
              <div className="pb-2">
                <h3 className="font-semibold">Property {property.id}</h3>
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
                    <div className="col-span-5">
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
                    <div className="col-span-3">
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
                    <div className="col-span-4">
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
                      <div>
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Input
                          as="textarea"
                          rows={6}
                          value={property.description}
                          onChange={(value) =>
                            handleInputChange(property.id, "description", value)
                          }
                        />
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
                        <Input
                          as="textarea"
                          rows={8}
                          type="text"
                          value={property.schools}
                          onChange={(value) =>
                            handleInputChange(property.id, "schools", value)
                          }
                        />
                      </div>
                    </div>
                    {/* What are the universities next to your house? */}
                    <div className="col-span-6">
                      <div>
                        <label className="text-sm font-medium">
                          What are the universities next to your house?
                        </label>
                        <Input
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
                        />
                      </div>
                    </div>
                  </div>
                </div>{" "}
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
                        <Input
                          as="textarea"
                          rows={8}
                          type="text"
                          value={property.allowedPets}
                          onChange={(value) =>
                            handleInputChange(property.id, "allowedPets", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
              <span className="hover:underline text-sm">Add New Property</span>
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            size="lg"
            className="!bg-[#29429f] !px-12 !rounded-2xl !py-4 !text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TenantPetsInformationEdit;
