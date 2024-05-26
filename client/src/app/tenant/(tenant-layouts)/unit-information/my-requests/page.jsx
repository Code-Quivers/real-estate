"use client";
import SendMessagePopOverFromTenant from "@/components/Shared/modal/SendMessagePopOverFromTenant";
import RequestCardSwiper from "@/components/tenant/request/RequestCardSwiper";
import SingleRequestDrawer from "@/components/tenant/request/SingleRequestDrawer";
import { getType } from "@/constants/tableValues";
import { useGetMyRequestedMaintenanceQuery } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { getMaintenanceStatusStyles } from "@/utils/getStatusStyles";
import Link from "next/link";
import { useState } from "react";

const MyMaintenanceRequests = () => {
  const [open, setOpen] = useState(false);
  const [requestToDrawer, setRequestToDrawer] = useState(null);
  const { data: myAllRequests, isError, isLoading, error } = useGetMyRequestedMaintenanceQuery();
  return (
    <div className="max-w-[1150px] mt-6 2xl:mx-auto md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto ">
      {!isError && (
        <div className="my-5 max-md:px-3 text-lg flex justify-between">
          <h2>My Maintenance Requests | total {myAllRequests?.data?.length || 0}</h2>
          <Link href="/tenant/unit-information/request-maintenance" className="bg-primary px-4 rounded-full py-1 text-white hover:bg-primary/90">
            Send request
          </Link>
        </div>
      )}

      {!isLoading && isError && (
        <div className="flex justify-center items-center min-h-[70vh] text-red-400 font-semibold text-3xl">
          {error?.message || "Something went wrong"}...
        </div>
      )}

      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-md:px-3">
        {myAllRequests?.data?.length > 0 &&
          myAllRequests?.data?.map((request, idx) => (
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
                    <div className="flex items-center justify-between">
                      <p className="line-clamp-1 font-medium">Issue: {request?.issueType}</p>
                      <span className={`${getMaintenanceStatusStyles(request?.status)} px-2.5  py-0.5 font-medium text-xs border rounded-full `}>
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
              <div className="flex justify-between items-center border-t my-2 text-base px-3">
                <div className="mt-2">
                  <p className="text-gray-900">Owner</p>
                  <p>
                    {request?.owner?.firstName} {request?.owner?.lastName}
                  </p>
                </div>

                <SendMessagePopOverFromTenant receiverId={request?.owner?.userId} />
              </div>
            </div>
          ))}
      </section>
      <div>
        {!isError && !isLoading && !myAllRequests?.data?.length > 0 && (
          <div className="flex justify-center items-center min-h-[40vh]">
            <h2>No Request Found</h2>
          </div>
        )}
      </div>

      <SingleRequestDrawer open={open} setOpen={setOpen} requestToDrawer={requestToDrawer} />
    </div>
  );
};

export default MyMaintenanceRequests;
