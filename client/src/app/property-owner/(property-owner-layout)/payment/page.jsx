"use client";
import { fileUrlKey, getUnitPackagePrices } from "@/configs/envConfig";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Checkbox, CheckboxGroup, Notification, useToaster } from "rsuite";
import apartmentPhoto from "@/assets/house/house-logo.jpg";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useRouter } from "next/navigation";
import moment from "moment";

const Payment = () => {
  const { data: unitRes, isLoading } = useGetMyAllUnitsQuery();
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
      router.push(`/property-owner/unit-information/payment/${data?.data?.orderId}`);
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
      <section className="mx-auto max-w-4xl">
        <h1 className="text-center mt-10 text-2xl">Payment</h1>
        <div className="max-w-5xl mx-auto">
          <h3 className="mb-2">Select property that you want to payment</h3>
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
                    <Checkbox color="green" value={singleUnit?.propertyId} className="!w-full">
                      <div className="grid grid-cols-11 gap-1.5 w-full select-none">
                        {/* unit image */}
                        <div className="col-span-2  ">
                          <Image
                            width={500}
                            height={200}
                            src={singleUnit?.images?.length ? `${fileUrlKey()}/${singleUnit?.images[0]}` : apartmentPhoto}
                            className=" rounded-lg !w-full !h-[100px] object-cover object-center"
                            alt=""
                          />
                        </div>
                        {/* unit information */}
                        <div className="col-span-4    flex flex-col justify-around  w-full space-y-1">
                          <h3 className="text-xs">Title: {singleUnit?.title || "N/A"}</h3>
                          <h3 className="text-xs font-medium">
                            Monthly Rent: ${singleUnit?.monthlyRent ? singleUnit?.monthlyRent?.toLocaleString() : "N/A"}
                          </h3>
                          <h3 className="text-xs ">
                            {singleUnit?.numOfBed} Beds {singleUnit?.numOfBath} Baths
                          </h3>
                          <h3 className="text-xs ">Address: {singleUnit?.address || "N/A"}</h3>
                        </div>

                        {/* payment information */}
                        <div className="col-span-3   flex flex-col justify-around  w-full">
                          {singleUnit?.planType === "PREMIUM" ? (
                            <div className="flex flex-col justify-between  w-full h-full ">
                              <div>
                                <h3 className="text-xs font-semibold">Payment Information </h3>
                              </div>
                              <div className="">
                                <h3 className="text-xs">From : {singleUnit?.paidFrom ? moment(singleUnit?.paidFrom).format("ll") : "N/A"}</h3>

                                <h3 className="text-xs">To : {singleUnit?.paidTo ? moment(singleUnit?.paidTo).format("ll") : "N/A"}</h3>
                              </div>
                              <div>
                                <h3 className="text-xs">Package Type : {singleUnit?.packageType || "N/A"}</h3>
                                <h3 className="text-xs">
                                  Package Price : {singleUnit?.packageType ? `$ ${getUnitPackagePrices()[singleUnit?.packageType]}` : "N/A"}
                                </h3>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center ">
                              <p className="text-xs">
                                No Payment
                                <br />
                                Details Available
                              </p>
                            </div>
                          )}
                        </div>

                        {/* tenant details */}

                        <div className="col-span-2 border mr-3 rounded-lg flex flex-col justify-around text-center">
                          <h2 className="text-xs">Tenant Details</h2>
                          {singleUnit?.isRented ? (
                            <div className="flex flex-col items-center justify-center   ">
                              <div>
                                <Avatar
                                  circle
                                  size="md"
                                  src={singleUnit?.Tenant?.profileImage ? `${fileUrlKey()}/${singleUnit?.Tenant?.profileImage}` : profileLogo}
                                  className=" rounded-xl border  object-cover object-center"
                                  alt=""
                                />
                              </div>
                              <div>
                                <h2 className="text-xs">
                                  {singleUnit?.Tenant?.firstName} {singleUnit?.Tenant?.lastName}
                                </h2>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h2 className="text-xs">No Tenant Available</h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </Checkbox>
                  </div>
                ))}
            </div>
          </CheckboxGroup>

          <div className="mt-10 flex justify-end">
            <button
              disabled={!selectedProperties?.length}
              type="button"
              onClick={handleCreateNewOrder}
              className="bg-primary disabled:cursor-not-allowed disabled:bg-opacity-70 px-5 py-2 rounded-3xl text-white duration-300 transition-all"
            >
              Pay Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
