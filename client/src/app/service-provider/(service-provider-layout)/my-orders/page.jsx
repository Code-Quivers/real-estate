"use client";

import { useGetMyAllAcceptedOrdersQuery } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { getType } from "@/constants/tableValues";
import { useState } from "react";
import UpdateMyOrderStatusModal from "@/components/service-provider/my-orders/UpdateMyOrderStatusModal";
import Link from "next/link";
import RequestCardSwiper from "@/components/tenant/request/RequestCardSwiper";
import SendMessagePopOverFromServiceProvider from "@/components/service-provider/messaging/SendMessagePopOverFromServiceProvider";
import OrderInfoDrawer from "@/components/service-provider/my-orders/OrderInfoDrawer";

const MyAcceptedAllOrders = () => {
  const { data: myAllOrders, isLoading, isFetching, isError, error } = useGetMyAllAcceptedOrdersQuery({});
  const [editData, setEditData] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleClose = () => setIsOpenEdit(false);

  const [open, setOpen] = useState(false);
  const [requestToDrawer, setRequestToDrawer] = useState(null);

  return (
    <div>
      {" "}
      <div className="max-w-[1150px] mt-6 2xl:mx-auto  md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
        <div className="flex justify-between items-center max-md:px-3 my-5">
          <h2 className="md:text-lg font-medium">My All Orders | total {myAllOrders?.data?.total || 0}</h2>
          <Link href="/service-provider/my-orders/all-order-list" className=" text-sm hover:underline ">
            All Accepted Order List
          </Link>
        </div>

        {!isLoading && isError && (
          <div className="flex justify-center items-center min-h-[70vh] text-red-400 font-semibold text-3xl">
            {error?.message || "Something went wrong"}..
          </div>
        )}

        <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-md:px-3 ">
          {!isLoading &&
            myAllOrders?.data?.data?.length > 0 &&
            myAllOrders?.data?.data?.map((request, idx) => (
              <div key={idx} className="border bg-white rounded-md shadow-sm">
                {/* image and description */}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setRequestToDrawer(request);
                  }}
                >
                  <RequestCardSwiper requestImages={request?.images} />
                  <div className="mt-3">
                    <div className="px-3">
                      <div className="flex items-start justify-between">
                        <p className="line-clamp-1 font-medium">Issue: {request?.issueType}</p>

                        <span
                          className={`${
                            request?.status === "PENDING"
                              ? "bg-yellow-100 border-yellow-600 text-yellow-600"
                              : request?.status === "ACTIVE"
                                ? "bg-blue-100 text-blue-600 border-blue-600"
                                : request?.status === "COMPLETED"
                                  ? "bg-green-100 text-green-600 border-green-600"
                                  : request?.status === "CANCEL"
                                    ? "bg-red-100 text-red-600 border-red-600"
                                    : request?.status === "PAUSED"
                                      ? "bg-gray-100 text-gray-600 border-gray-600"
                                      : ""
                          } px-2.5  py-0.5 font-medium text-xs border rounded-full `}
                        >
                          {request?.status}
                        </span>
                      </div>
                      <p className="text-sm">{getType(request?.priority)}</p>
                      <p className="line-clamp-3 text-sm mt-2">{request?.description}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="absolute inset-0 flex justify-end text-xs mt-2 ">
                <div>
                  <p className="bg-[#868E96] text-white px-2 py-1 rounded-full">{getType(request?.priority)}</p>
                </div>
              </div> */}

                {/* owner name and contact */}
                <div className="flex justify-between items-center border-t my-2 py-3 text-base px-3">
                  <div className=" ">
                    <p className="text-gray-900 text-xs">Owner </p>
                    <p className="text-sm font-medium">
                      {request?.owner?.firstName} {request?.owner?.lastName}
                    </p>
                  </div>

                  <div>
                    <SendMessagePopOverFromServiceProvider receiverId={request?.owner?.userId} />
                  </div>
                </div>
              </div>
            ))}
        </section>
        {!isLoading && !myAllOrders?.data?.data?.length > 0 && (
          <div className="flex justify-center items-center min-h-[40vh]">
            <h2>No Order Found</h2>
          </div>
        )}
      </div>
      {/* modal  */}
      <div>
        <UpdateMyOrderStatusModal editData={editData} isOpen={isOpenEdit} handleClose={handleClose} />
      </div>
      {/*  */}
      <OrderInfoDrawer open={open} setOpen={setOpen} requestToDrawer={requestToDrawer} />
    </div>
  );
};

export default MyAcceptedAllOrders;
