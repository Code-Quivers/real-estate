"use client";
import apartmentPhoto from "@/assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { IconButton, Placeholder } from "rsuite";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import { fileUrlKey } from "@/configs/envConfig";
import UnitEditModal from "@/components/property-owner/unit-information/UnitEditModal";
import { useState } from "react";

const PropertyOwnerUnitInformation = () => {
  const { data, isLoading, isSuccess, isError } = useGetMyAllUnitsQuery();

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleCloseEdit = () => setIsOpenEdit(false);
  return (
    <>
      <section className=" lg:max-w-[1050px]   max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-10 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl  ">Unit Information | Total {data?.meta?.total}</h2>
          <Link
            href="/property-owner/unit-information/add-property"
            className=" bg-primary text-white px-3 rounded-full flex items-center gap-2 py-2 drop-shadow-lg"
          >
            <FaPlus /> Add New Unit / House
          </Link>
        </div>
        {/* main section */}
        <div>
          {data?.data?.map((singleProperty, idx) => (
            <div key={Math.random()} className="mt-5">
              <h2 className="text-base font-bold mb-4 ">Property {idx + 1}</h2>
              <div className="w-full lg:border p-3  md:p-3 lg:p-6 mt-5  shadow-2xl shadow-[#70707023] bg-white  rounded-xl space-y-8 ">
                {/* top section */}
                <div className="grid grid-cols-12  gap-5">
                  <div className="col-span-12  md:col-span-12 lg:col-span-6  ">
                    <Image
                      width={500}
                      height={200}
                      src={singleProperty?.images?.length ? `${fileUrlKey()}/${singleProperty?.images[0]}` : apartmentPhoto}
                      className="!w-full rounded-xl !h-[300px] object-cover object-center"
                      alt=""
                    />
                  </div>
                  {/* unit info */}
                  <div className="col-span-12 space-y-3 lg:col-span-6 flex flex-col justify-between  ">
                    <div className="  space-y-3  flex border rounded-xl justify-between       w-full    ">
                      <div className="flex  justify-between w-full">
                        <div className="space-y-3 p-5 w-full">
                          <h3 className="text-lg font-medium">$ {singleProperty?.monthlyRent}</h3>
                          <h3 className="text-lg font-medium">
                            {singleProperty?.numOfBed} Beds {singleProperty?.numOfBath} Baths
                          </h3>
                          <h3 className="text-lg font-medium">{singleProperty?.address}</h3>
                        </div>
                        <div>
                          <IconButton
                            onClick={() => {
                              setIsOpenEdit(true);
                              setEditData(singleProperty);
                            }}
                            icon={<FaPencilAlt size={30} color="#030303" />}
                            appearance="subtle"
                            circle
                          />
                        </div>
                      </div>
                    </div>
                    {/* tenant details */}
                    <div className=" col-span-12 border    rounded-xl min-h-[110px] px-3 py-1.5 lg:col-span-5 ">
                      {/* tenant title and button */}
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-semibold">Tenant Information</h3>
                        </div>
                        {/* if rented add button will hidden */}
                      </div>
                      {/* tenant details */}
                      {singleProperty?.isRented ? (
                        <>
                          <div className="flex  gap-3   mt-2 ">
                            <div>
                              <Image
                                width={90}
                                height={90}
                                src={
                                  singleProperty?.Tenant?.profileImage ? `${fileUrlKey()}/${singleProperty?.Tenant?.profileImage}` : apartmentPhoto
                                }
                                className=" rounded-xl  object-cover object-center"
                                alt=""
                              />
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold">
                                {singleProperty?.Tenant?.firstName} {singleProperty?.Tenant?.lastName}
                              </h2>
                              <h2 className="text-lg font-semibold">{singleProperty?.Tenant?.phoneNumber ?? "017"}</h2>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex mt-5    items-center justify-between">
                          <div>
                            <h3 className="text-sm text-black/80 text-center ">No Tenant Added</h3>
                          </div>
                          <div>
                            {!singleProperty?.isRented && (
                              <div className="flex gap-2 justify-center  items-center">
                                <Link
                                  href="/property-owner/available-tenants"
                                  className="rounded-full border border-transparent bg-primary text-white px-5 py-2 text-sm"
                                >
                                  Add Tenant
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* service provider */}
                <div className="border      rounded-xl min-h-[200px] p-5 lg:col-span-5 ">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Service Provider Information | Total {singleProperty?.serviceProviders?.length}</h3>
                    </div>
                    {/* action */}
                    <div className="flex gap-2 items-center">
                      <Link
                        href="/property-owner/service-providers"
                        className=" border border-transparent bg-primary text-white rounded-full flex items-center gap-1 px-3 py-1"
                      >
                        <FaPlus /> Add Service Provider
                      </Link>
                      <button
                        type="button"
                        className=" rounded-full border border-primary hover:border-primary/80 hover:text-white hover:bg-primary/80 text-primary px-2 py-1"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  {/* all service Providers */}
                  <div className="">
                    {singleProperty?.serviceProviders?.length > 0 &&
                      singleProperty?.serviceProviders?.map((serviceProvider) => (
                        <div key={Math.random()} className="flex gap-3 items-stretch border-t pt-3 mt-3">
                          <div className=" ">
                            <Image
                              width={150}
                              height={150}
                              src={serviceProvider?.profileImage ? `${fileUrlKey()}/${serviceProvider?.profileImage}` : apartmentPhoto}
                              className=" rounded-xl  object-cover "
                              alt=""
                            />
                          </div>
                          <div className="  w-full lg:grid max-lg:space-y-3 lg:grid-cols-2 justify-between gap-2 lg:divide-x-2  ">
                            {/* information */}
                            <div className="  w-full">
                              <h4>
                                Name : {serviceProvider?.firstName} {serviceProvider?.lastName}
                              </h4>
                              <h4>Email : {serviceProvider?.user?.email}</h4>
                              <h4>Company Name : {serviceProvider?.companyName}</h4>
                              <h4>Company Email : {serviceProvider?.companyEmailAddress}</h4>
                              <h4>Company Address : {serviceProvider?.companyAddress}</h4>
                            </div>
                            {/* Service details */}
                            <div className="lg:pl-2 w-full">
                              <h4 className="flex justify-between">
                                <span>Service Type</span>-<span>{serviceProvider?.Service?.serviceType}</span>
                              </h4>
                              <h4 className="flex justify-between">
                                <span>Service Availability</span>-<span>{serviceProvider?.Service?.serviceAvailability}</span>
                              </h4>
                              <h4 className="flex justify-between">
                                <span>Service Location</span>-<span>{serviceProvider?.Service?.serviceLocation}</span>
                              </h4>
                              <h4 className="flex justify-between">
                                <span>Service Range</span>-
                                <span>
                                  ${serviceProvider?.Service?.minPrice} - ${serviceProvider?.Service?.maxPrice}
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* if loading */}
          {isLoading && (
            <div className=" mt-10 gap-y-5 flex flex-col">
              <div>
                <Placeholder.Graph active height={150} />
              </div>
              <div>
                <Placeholder.Graph active height={150} />
              </div>
              <div>
                <Placeholder.Graph active height={150} />
              </div>
              <div>
                <Placeholder.Graph active height={150} />
              </div>
            </div>
          )}

          {/* if no data is available */}
          {!isLoading && data?.data?.length < 1 && (
            <div className="flex justify-center min-h-[60vh] items-center">
              <h2 className="text-3xl font-semibold text-rose-400">No Unit Found </h2>
            </div>
          )}
        </div>
      </section>
      {/* Unit edit modal */}
      <UnitEditModal open={isOpenEdit} editData={editData} handleClose={handleCloseEdit} />
      {/* tenant view modal */}
    </>
  );
};

export default PropertyOwnerUnitInformation;
