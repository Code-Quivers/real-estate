"use client";

import SendMessagePopOverFromTenant from "@/components/Shared/modal/SendMessagePopOverFromTenant";
import SendMessagePopOverFromPropertyOwner from "@/components/property-owner/available-tenants/SendMessagePopOver";
import RequestCardSwiper from "@/components/tenant/request/RequestCardSwiper";
import { fileUrlKey } from "@/configs/envConfig";
import { cellCss, headerCss } from "@/constants/tableStyles";
import { getType } from "@/constants/tableValues";
import { useGetMyRequestedMaintenanceQuery } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import Image from "next/image";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const MyMaintenanceRequests = () => {
  const { data: myAllRequests, isError, isLoading, isFetching, error } = useGetMyRequestedMaintenanceQuery();
  return (
    <div className="max-w-[1150px] mt-6 2xl:mx-auto md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto ">
      {!isError && (
        <div className="my-5 max-md:px-3 text-lg">
          <h2>My Maintenance Requests | total {myAllRequests?.data?.length || 0}</h2>
        </div>
      )}

      {!isLoading && isError && (
        <div className="flex justify-center items-center min-h-[70vh] text-red-400 font-semibold text-3xl">
          {error?.message || "Something went wrong"}..
        </div>
      )}
      <div></div>
      {console.log(myAllRequests, "myAllRequests")}
      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-md:px-3">
        {myAllRequests?.data?.length > 0 &&
          myAllRequests?.data?.map((request, idx) => (
            <div key={idx} className="border bg-white rounded-md shadow-sm">
              <RequestCardSwiper requestImages={request?.images} />
              {/* <Image
                width={1000}
                height={1000}
                alt=""
                src={`${fileUrlKey()}/${request.images[0]}`}
                className=" w-full object-center rounded-t-md h-40"
              /> */}
              {/* <div className="absolute inset-0 flex justify-end text-xs mt-2 ">
                <div>
                  <p className="bg-[#868E96] text-white px-2 py-1 rounded-full">{getType(request?.priority)}</p>
                </div>
              </div> */}
              <div className="mt-3">
                <div className="px-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="line-clamp-1 font-medium">Issue: {request?.issueType}</p>
                    </div>
                    <div></div>
                    <p
                      className={`${request?.status === "PENDING" ? "bg-yellow-100  border-yellow-500 text-yellow-600" : request?.status == "APPROVED" ? "bg-blue-100 text-blue-600 border-blue-500" : request?.status === "CANCEL" ? "text-red-600 bg-red-100 border-red-600" : ""} px-2.5 font-medium text-xs border rounded-full`}
                    >
                      {request?.status}
                    </p>
                  </div>
                  <p className="text-sm">{getType(request?.priority)}</p>
                  <p className="line-clamp-3 text-sm mt-2">{request?.description}</p>
                </div>
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
            </div>
          ))}
      </section>
    </div>
  );
};

export default MyMaintenanceRequests;
