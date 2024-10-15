/* eslint-disable no-extra-boolean-cast */
"use client";
import { fileUrlKey, getUnitPackagePrices } from "@/configs/envConfig";
import { useGetMyAllUnitsForPaymentQuery } from "@/redux/features/propertyOwner/propertyApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Checkbox, CheckboxGroup, Loader, Notification, Pagination, useToaster } from "rsuite";
import apartmentPhoto from "@/assets/house/house-logo.jpg";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useDebounced } from "@/redux/hook";

const Payment = () => {
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  // filter
  query["limit"] = size;
  query["page"] = page;
  query["sortOrder"] = sortOrder;
  query["sortBy"] = sortBy;
  // ! debounce for slow search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });
  if (!!debouncedTerm) query["searchTerm"] = debouncedTerm;

  const { data: unitRes, isLoading } = useGetMyAllUnitsForPaymentQuery({
    limit: 100,
  });
  const [selectedProperties, setSelectedProperties] = useState([]);
  // api
  const [
    createOrder,
    { data, isLoading: isLoadingCreateOrder, isSuccess: isSuccessCreateOrder, isError: isErrorCreateOrder, error: errorCreateOrder },
  ] = useCreateOrderMutation();
  const router = useRouter();

  // submit
  const handleCreateNewOrder = async () => {
    await createOrder({
      data: { properties: selectedProperties },
    });
  };
  // // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoadingCreateOrder && !isErrorCreateOrder && isSuccessCreateOrder && !errorCreateOrder) {
      router.push(`/property-owner/unit-information/payment/${data?.data?.orderId}?isPropertyCreating=0`);
    }
    if (!isLoadingCreateOrder && isErrorCreateOrder && !isSuccessCreateOrder) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          {errorCreateOrder?.message || "Failed to Pay"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );
    }
  }, [isLoadingCreateOrder, isErrorCreateOrder, isSuccessCreateOrder, errorCreateOrder, router, toaster]);

  return (
    <>
      <section className="mx-auto max-w-5xl px-3 pb-20">
        <h1 className="text-center my-5 lg:mt-10 text-2xl">Payment</h1>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h3 className="mb-2">Select property that you want to Payment</h3>
          </div>
          {!isLoading && unitRes?.data?.length > 0 && (
            <div>
              <CheckboxGroup
                value={selectedProperties}
                onChange={(newValue) => {
                  setSelectedProperties(newValue);
                }}
              >
                <div className="space-y-2">
                  {!isLoading &&
                    unitRes?.data?.length > 0 &&
                    unitRes?.data?.map((singleUnit, idx) => (
                      <div
                        key={idx}
                        className={` ${selectedProperties?.includes(singleUnit?.propertyId) && "border-primary"}  duration-300 transition-all border bg-white rounded-md shadow`}
                      >
                        <Checkbox disabled={singleUnit?.pendingPaidTo} color="green" value={singleUnit?.propertyId} className="!w-full">
                          <div className="grid grid-cols-2 md:grid-cols-11  w-full select-none ">
                            {/* Unit Image */}
                            <div className="col-span-2 md:col-span-3 w-full">
                              <Image
                                width={1000}
                                height={1000}
                                src={singleUnit?.images?.length ? `${fileUrlKey()}/${singleUnit?.images[0]}` : apartmentPhoto}
                                className="rounded-lg w-full h-[120px] md:h-[150px] object-cover object-center shadow-lg border border-gray-200"
                                alt=""
                              />
                            </div>

                            {/* Unit Information */}
                            <div className="md:col-span-5 flex space-y-2 flex-col justify-between w-full bg-white p-2 rounded-lg  transition-shadow duration-200">
                              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{singleUnit?.title || "N/A"}</h3>
                              <h3 className="text-base font-semibold text-green-600">
                                ${singleUnit?.monthlyRent ? singleUnit?.monthlyRent?.toLocaleString() : "N/A"}/month
                              </h3>
                              <h3 className="text-sm text-gray-600">
                                {singleUnit?.numOfBed} Beds • {singleUnit?.numOfBath} Baths
                              </h3>
                              <h3 className="text-sm text-gray-600 line-clamp-1">{singleUnit?.address || "N/A"}</h3>
                            </div>

                            {/* Payment Information */}
                            <div className="md:col-span-3 flex flex-col justify-between w-full bg-white p-2 rounded-l-none rounded-lg  border-l border-gray-300  transition-shadow duration-200">
                              {singleUnit?.planType === "PREMIUM" ? (
                                <div className="space-y-2">
                                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Payment Information</h3>
                                  <p className="text-sm text-gray-600">
                                    From: {singleUnit?.paidFrom ? moment(singleUnit?.paidFrom).format("ll") : "N/A"}
                                  </p>
                                  {singleUnit?.pendingPaidTo ? (
                                    <p className="text-sm text-yellow-600 font-semibold ">
                                      Pending Paid To: {singleUnit?.pendingPaidTo ? moment(singleUnit?.pendingPaidTo).format("ll") : "N/A"}
                                    </p>
                                  ) : (
                                    <p className="text-sm text-gray-600">
                                      To: {singleUnit?.paidTo ? moment(singleUnit?.paidTo).format("ll") : "N/A"}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">Package Type: {singleUnit?.packageType || "N/A"}</p>
                                  <p className="text-sm text-gray-600">
                                    Package Price:{" "}
                                    <span className="text-green-600 font-semibold">
                                      {singleUnit?.packageType ? `$${getUnitPackagePrices()[singleUnit?.packageType]}` : "N/A"}
                                    </span>
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <p className="text-sm font-medium text-red-500">No Payment Details Available</p>
                                </div>
                              )}
                            </div>

                            {/* Tenant Details */}
                            <div className="max-md:col-span-2 col-span-11 flex flex-col justify-around border-t pt-2 mt-2 bg-white p-3">
                              {singleUnit?.isRented ? (
                                <div className="flex items-center gap-4">
                                  <Avatar
                                    circle
                                    size="md"
                                    src={singleUnit?.Tenant?.profileImage ? `${fileUrlKey()}/${singleUnit?.Tenant?.profileImage}` : profileLogo}
                                    className="rounded-xl border border-gray-300 object-cover object-center"
                                    alt=""
                                  />
                                  <div>
                                    <h2 className="text-xs font-medium text-gray-800">Tenant</h2>
                                    <h2 className="text-sm font-semibold text-gray-800">
                                      {singleUnit?.Tenant?.firstName} {singleUnit?.Tenant?.lastName}
                                    </h2>
                                  </div>
                                </div>
                              ) : (
                                <h2 className="text-xs mt-2 font-medium text-gray-600">No Tenant Available</h2>
                              )}
                            </div>
                          </div>
                        </Checkbox>
                      </div>
                    ))}
                </div>
              </CheckboxGroup>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[30vh]">
              <Loader size="lg" />
            </div>
          )}
          {!isLoading && !unitRes?.data?.length > 0 && (
            <div className="flex justify-center items-center min-h-[30vh] ">
              <h2>No Properties found for Payment</h2>
            </div>
          )}

          <div className="mt-10 flex justify-end items-center space-x-4">
            {selectedProperties?.length > 0 && (
              <span className="px-3 py-1 text-lg font-semibold text-white bg-blue-400 rounded-full shadow-md">
                {selectedProperties.length} Selected
              </span>
            )}
            <button
              disabled={!selectedProperties?.length || isLoadingCreateOrder}
              type="button"
              onClick={handleCreateNewOrder}
              className={`relative px-6 py-3 rounded-full text-white font-bold transition-all duration-300
      ${
        !selectedProperties?.length
          ? "cursor-not-allowed bg-gray-400"
          : "bg-gradient-to-r from-primary to-purple-600 hover:from-purple-500 hover:to-blue-500 shadow-lg hover:scale-105"
      }`}
            >
              Pay Now
              {selectedProperties?.length > 0 && (
                <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold bg-red-600 text-white rounded-full">
                  {selectedProperties.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* pagination */}
        <div className="my-20 px-2">
          <Pagination
            total={unitRes?.meta?.total}
            prev
            next
            ellipsis
            size="sm"
            layout={["total", "-", "limit", "|", "pager"]}
            limitOptions={[10, 20, 30, 50]}
            limit={size}
            onChangeLimit={(limitChange) => setSize(limitChange)}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </section>
    </>
  );
};

export default Payment;
