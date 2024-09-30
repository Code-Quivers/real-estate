"use client";
import apartmentPhoto from "@/assets/house/house-logo.jpg";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { Avatar, Button, IconButton, Placeholder } from "rsuite";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import { fileUrlKey, getUnitPackagePrices } from "@/configs/envConfig";
import UnitEditModal from "@/components/property-owner/unit-information/UnitEditModal";
import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import RemoveTenantModal from "@/components/property-owner/unit-information/RemoveTenantModal";
import moment from "moment";
import UnitPackageDate from "@/components/property-owner/unit-information/UnitPackageDate";
import { getPackageExpiredDates } from "@/utils/GetDateCalculation";
import SendMessagePopOverFromPropertyOwner from "@/components/property-owner/available-tenants/SendMessagePopOver";

const PropertyOwnerUnitInformation = () => {
  const { data, isLoading } = useGetMyAllUnitsQuery({});
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setEditData(null);
  };

  // ! remove tenant
  const [tenantRemoveData, setTenantRemoveData] = useState(null);
  const [isOpenTenantRemove, setIsOpenTenantRemove] = useState(false);
  const handleCloseRemove = () => setIsOpenTenantRemove(false);

  // !

  return (
    <>
      <section className=" lg:max-w-6xl px-2 pb-20 mx-auto mt-6 lg:mt-10 2xl:mx-auto lg:px-5 2xl:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-sm lg:text-2xl">Unit Information: Total {data?.meta?.total}</h2>
          <Link
            href="/property-owner/unit-information/add-property"
            className=" bg-primary text-white px-4 rounded-3xl max-md:text-sm  flex items-center gap-2 py-2 drop-shadow-lg"
          >
            Add new unit / house
          </Link>
        </div>
        <hr className="mb-3 mt-5" />
        {/* main section */}
        <div className="max-md:space-y-10">
          {!isLoading &&
            data?.data?.length > 0 &&
            data?.data?.map((singleProperty, idx) => (
              <div key={idx} className="relative ">
                <div className="mt-5">
                  <div className="lg:flex lg:justify-between lg:items-start">
                    <h2 className="text-base mb-2">
                      <span className="max-md:hidden">Property</span> Title: <span className="font-medium md:font-bold">{singleProperty.title}</span>
                    </h2>

                    {/* <div>
                      <UnitPackageDate singleProperty={singleProperty} />
                    </div> */}
                    {/*  */}
                  </div>
                  {/*  */}
                  <div className="w-full lg:border p-2  md:p-3 lg:p-6 shadow-2xl shadow-[#70707023] bg-white rounded-xl space-y-8 ">
                    {/* top section */}
                    <div>
                      <UnitPackageDate singleProperty={singleProperty} />
                    </div>
                    <div className="grid grid-cols-12 gap-5 ">
                      <div className="col-span-12 md:col-span-12 lg:col-span-6 relative">
                        {/* disable logic start */}
                        {singleProperty?.planType === "ON_TRIAL"
                          ? moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                          : singleProperty?.planType === "PREMIUM"
                            ? getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                            : false && <div className="absolute inset-0 bg-white opacity-70 rounded-xl cursor-not-allowed"></div>}

                        {/* disable logic end */}
                        <Image
                          width={500}
                          height={200}
                          src={singleProperty?.images?.length ? `${fileUrlKey()}/${singleProperty?.images[0]}` : apartmentPhoto}
                          className={`!w-full rounded-xl !h-[300px] object-cover object-center ${
                            singleProperty?.planType === "ON_TRIAL" && moment().diff(moment(singleProperty?.createdAt), "days") >= 30 && "blur-[3px]"
                          }`}
                          alt=""
                        />
                      </div>
                      {/* unit info */}
                      <div className=" col-span-12 space-y-3 lg:col-span-6 flex flex-col justify-between">
                        <div className="space-y-3 relative flex border rounded-xl justify-between w-full">
                          {/* disable logic */}
                          {singleProperty?.planType === "ON_TRIAL"
                            ? moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                            : singleProperty?.planType === "PREMIUM"
                              ? getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                              : false && <div className="absolute inset-0 bg-white opacity-70 rounded-xl cursor-not-allowed z-[9999]"></div>}
                          {/* disable logic end */}
                          <div className="flex justify-between w-full">
                            <div className="space-y-3 p-5 w-full">
                              <h3 className="text-lg font-medium">
                                ${singleProperty?.monthlyRent ? singleProperty?.monthlyRent?.toLocaleString() : "N/A"}
                              </h3>
                              <h3 className="text-lg">
                                {singleProperty?.numOfBed} Beds {singleProperty?.numOfBath} Baths
                              </h3>
                              <h3 className="text-lg">{singleProperty?.address}</h3>
                            </div>
                            <div className="pt-2 pr-2">
                              <IconButton
                                disabled={
                                  singleProperty?.planType === "ON_TRIAL"
                                    ? moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                    : singleProperty?.planType === "PREMIUM"
                                      ? getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                                      : false
                                }
                                onClick={() => {
                                  setIsOpenEdit(true);
                                  setEditData(singleProperty);
                                }}
                                icon={<FaPencilAlt size={18} color="#030303" />}
                                appearance={
                                  singleProperty?.planType === "ON_TRIAL" && moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                    ? "link"
                                    : "subtle"
                                }
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

                            {singleProperty?.isRented && singleProperty?.Tenant && (
                              <div className="flex gap-4 items-center">
                                <SendMessagePopOverFromPropertyOwner receiverId={singleProperty?.Tenant?.userId} />

                                {/* <BiSolidMessageAltDetail size={20} /> */}

                                <button
                                  disabled={
                                    singleProperty?.planType === "ON_TRIAL"
                                      ? moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                      : singleProperty?.planType === "PREMIUM"
                                        ? getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                                        : false
                                  }
                                  onClick={() => {
                                    setIsOpenTenantRemove(true);
                                    setTenantRemoveData(singleProperty);
                                  }}
                                  className="hover:text-red-600 text-primary bg-indigo-100 border p-2 rounded-full  duration-300 disabled:cursor-not-allowed"
                                >
                                  <RiDeleteBin5Fill size={24} />
                                </button>
                              </div>
                            )}

                            {/* if rented add button will hidden */}
                          </div>
                          {/* tenant details */}
                          {singleProperty?.isRented && singleProperty?.Tenant ? (
                            <>
                              <div className="flex gap-3 mt-2 ">
                                <div>
                                  <Avatar
                                    circle
                                    size="lg"
                                    src={
                                      singleProperty?.Tenant?.profileImage ? `${fileUrlKey()}/${singleProperty?.Tenant?.profileImage}` : profileLogo
                                    }
                                  />
                                </div>
                                <div>
                                  <h2 className="md:text-lg font-medium md:font-semibold">
                                    {singleProperty?.Tenant?.firstName} {singleProperty?.Tenant?.lastName}
                                  </h2>
                                  <h2 className="text-md md:font-medium">
                                    Phone Number : {singleProperty?.Tenant?.phoneNumber ? singleProperty?.Tenant?.phoneNumber : "N/A"}
                                  </h2>
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
                                    <Button
                                      as={
                                        singleProperty?.planType === "ON_TRIAL" && moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                          ? "button"
                                          : Link
                                      }
                                      disabled={
                                        singleProperty?.planType === "ON_TRIAL"
                                          ? moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                          : singleProperty?.planType === "PREMIUM"
                                            ? getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                                            : false
                                      }
                                      href="/property-owner/available-tenants"
                                      className={`!rounded-full  !text-white !px-5 !py-2.5 !text-sm
                                         ${
                                           singleProperty?.planType === "ON_TRIAL" && moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                             ? "!bg-red-300"
                                             : "!bg-primary"
                                         } `}
                                    >
                                      Add Tenant
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* payment information */}

                    {singleProperty?.planType === "PREMIUM" && (
                      <div className="border rounded-xl min-h-[100px] p-5 lg:col-span-5 ">
                        <div>
                          <h3 className="text-lg font-semibold">Payment Information </h3>
                        </div>
                        <div className="flex items-center gap-5">
                          <h3>Payment From : {singleProperty?.paidFrom ? moment(singleProperty?.paidFrom).format("ll") : "N/A"}</h3>
                          <span>-</span>
                          <h3>To : {singleProperty?.paidTo ? moment(singleProperty?.paidTo).format("ll") : "N/A"}</h3>
                        </div>
                        <div>
                          <h2>Package Type : {singleProperty?.packageType || "N/A"}</h2>
                          <h2>Package Price : {singleProperty?.packageType ? `$ ${getUnitPackagePrices()[singleProperty?.packageType]}` : "N/A"}</h2>
                        </div>
                      </div>
                    )}

                    {/* service provider */}
                    <div className="border rounded-xl min-h-[200px] p-2 md:p-5 lg:col-span-5">
                      <div className="md:flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">Service Provider Information: Total {singleProperty?.serviceProviders?.length}</h3>
                        </div>
                        {/* action */}
                        <div className="flex max-md:mt-2 gap-2 items-center">
                          <Button
                            as={
                              singleProperty?.planType === "ON_TRIAL" && moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                ? "button"
                                : Link
                            }
                            disabled={
                              singleProperty?.planType === "ON_TRIAL"
                                ? moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                : singleProperty?.planType === "PREMIUM"
                                  ? getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                                  : false
                            }
                            href="/property-owner/service-providers"
                            className={`!rounded-full !bg-primary !text-white !px-3 !py-2.5 !text-sm ${
                              singleProperty?.planType === "ON_TRIAL" && moment().diff(moment(singleProperty?.createdAt), "days") >= 30
                                ? "!bg-red-300"
                                : "!bg-primary"
                            } `}
                          >
                            Add Service Provider
                          </Button>
                          {/* <button
                          type="button"
                          className=" rounded-full border border-primary hover:border-primary/80 hover:text-white hover:bg-primary/80 text-primary px-2 py-1"
                        >
                          Update
                        </button> */}
                        </div>
                      </div>
                      {/* all service Providers */}
                      <div className="">
                        {singleProperty?.serviceProviders?.length > 0 &&
                          singleProperty?.serviceProviders?.map((serviceProvider) => (
                            <div key={Math.random()} className="md:flex max-md:space-y-2 gap-3 items-stretch border-t pt-3 mt-3">
                              <div className=" ">
                                <Image
                                  width={500}
                                  height={500}
                                  src={serviceProvider?.profileImage ? `${fileUrlKey()}/${serviceProvider?.profileImage}` : apartmentPhoto}
                                  className="w-28 h-28 rounded-xl object-cover"
                                  alt=""
                                />
                              </div>
                              <div className="  w-full lg:grid max-lg:space-y-3 lg:grid-cols-2 justify-between gap-2 lg:divide-x-2  ">
                                {/* information */}
                                <div className="*:text-sm space-y-0.5  w-full">
                                  <h4 className=" space-x-2 flex justify-between font-semibold items-center">
                                    <span>Name :</span>
                                    <span>
                                      {serviceProvider?.firstName} {serviceProvider?.lastName}
                                    </span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Email :</span> <span> {serviceProvider?.user?.email}</span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Company Name :</span> <span>{serviceProvider?.companyName ? serviceProvider?.companyName : "N/A"}</span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Company Email :</span>{" "}
                                    <span>{serviceProvider?.companyEmailAddress ? serviceProvider?.companyEmailAddress : "N/A"}</span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span> Company Address :</span>
                                    <span>{serviceProvider?.companyAddress ? serviceProvider?.companyAddress : "N/A"}</span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Company Phone Number:</span>{" "}
                                    <span>{serviceProvider?.companyPhoneNumber ? serviceProvider?.companyPhoneNumber : "N/A"}</span>
                                  </h4>
                                </div>
                                {/* Service details */}
                                <div className="lg:pl-2 w-full *:text-sm ">
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Service Type :</span>
                                    <span>
                                      {serviceProvider?.Service?.serviceType
                                        ? serviceProvider?.Service?.serviceType
                                            .replace(/_/g, " ")
                                            .toLowerCase()
                                            .replace(/\b\w/g, (c) => c.toUpperCase())
                                        : "N/A"}
                                    </span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Service Availability :</span>{" "}
                                    <span>
                                      {serviceProvider?.Service?.serviceAvailability
                                        ? serviceProvider?.Service?.serviceAvailability
                                            .replace(/_/g, " ")
                                            .toLowerCase()
                                            .replace(/\b\w/g, (c) => c.toUpperCase())
                                        : "N/A"}
                                    </span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Service Location :</span>
                                    <span>{serviceProvider?.Service?.serviceLocation ? serviceProvider?.Service?.serviceLocation : "N/A"}</span>
                                  </h4>
                                  <h4 className=" space-x-2 flex justify-between items-center">
                                    <span>Service Range :</span>
                                    <span>
                                      ${serviceProvider?.Service?.minPrice ? serviceProvider?.Service?.minPrice?.toLocaleString() : "0"} - $
                                      {serviceProvider?.Service?.maxPrice ? serviceProvider?.Service?.maxPrice?.toLocaleString() : "0"}
                                    </span>
                                  </h4>
                                  <div className="mt-3 flex justify-between items-center">
                                    <p className="font-semibold">Contact</p>
                                    <SendMessagePopOverFromPropertyOwner receiverId={serviceProvider?.userId} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        {!isLoading && !singleProperty?.serviceProviders?.length > 0 && (
                          <div className="mt-10 flex justify-center">
                            <h2>No Service Providers added yet</h2>
                          </div>
                        )}
                      </div>
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
          {!isLoading && !data?.data?.length && (
            <div className="flex justify-center min-h-[60vh] items-center">
              <h2 className="text-3xl font-semibold text-rose-400">No Unit Found </h2>
            </div>
          )}
        </div>
      </section>
      {/* Unit edit modal */}
      <UnitEditModal open={isOpenEdit} editData={editData} handleClose={handleCloseEdit} />
      {/* tenant view modal */}

      {/* remove tenant drawer */}

      <RemoveTenantModal tenantRemoveData={tenantRemoveData} isOpenTenantRemove={isOpenTenantRemove} handleCloseRemove={handleCloseRemove} />
    </>
  );
};

export default PropertyOwnerUnitInformation;
