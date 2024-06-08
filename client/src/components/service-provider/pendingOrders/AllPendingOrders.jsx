"use client";

import { getType } from "@/constants/tableValues";
import {
  useAcceptMaintenanceRequestForServiceProviderMutation,
  useGetAllMaintenanceReqForServiceProviderQuery,
} from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { useEffect, useState } from "react";
import { Loader, Message, useToaster } from "rsuite";
import SendMessagePopOverFromServiceProvider from "../messaging/SendMessagePopOverFromServiceProvider";
import RequestCardSwiper from "@/components/tenant/request/RequestCardSwiper";

import MaintenanceReqDetailsSidebar from "./MaintenanceReqDetailsSidebar";

const AllPendingOrders = () => {
  const { data: allRequest, isLoading } = useGetAllMaintenanceReqForServiceProviderQuery({});
  const toaster = useToaster();
  const [
    acceptMaintenanceRequestForServiceProvider,
    { data: approveData, isLoading: isLoadingApprove, isError: isErrorApprove, isSuccess: isSuccessApprove, error: errorApprove, reset },
  ] = useAcceptMaintenanceRequestForServiceProviderMutation();

  const handleAcceptRequest = async (reqId) => {
    await acceptMaintenanceRequestForServiceProvider(reqId);
  };

  useEffect(() => {
    if (!isLoadingApprove && !isErrorApprove && isSuccessApprove) {
      toaster.push(
        <Message bordered centered showIcon type="success">
          <span className="lg:text-2xl">{approveData?.message || "Successfully Accepted"}</span>
        </Message>,
        {
          placement: "bottomStart",
        },
      );
      reset();
    }
    if (!isLoadingApprove && isErrorApprove && !isSuccessApprove && errorApprove) {
      toaster.push(
        <Message bordered showIcon type="error">
          <span className="lg:text-2xl">{errorApprove?.message || "Failed to Accept"}</span>
        </Message>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingApprove, isErrorApprove, isSuccessApprove, errorApprove, toaster]);

  // !

  const [open, setOpen] = useState(false);
  const [requestToDrawer, setRequestToDrawer] = useState(null);

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader size="lg" content="Loading..." />
        </div>
      )}
      <section className="mt-5 space-y-5">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-md:px-3 ">
          {!isLoading &&
            allRequest?.data?.length > 0 &&
            allRequest?.data?.map((request, idx) => (
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
                      </div>
                      <p className="text-sm mt-1">
                        Priority: <span>{getType(request?.priority)}</span>
                      </p>
                      <p className="line-clamp-3 text-sm mt-2">{request?.description}</p>
                    </div>
                  </div>
                </div>

                {/*  */}
                <hr className="my-2" />
                {/* tenants and contact */}
                <div className="mx-2">
                  <div className=" flex items-center justify-between gap-3">
                    <div>
                      <p className="text-gray-900 text-xs">Tenant </p>
                      <p className="line-clamp-1 text-sm">
                        {request?.tenant?.firstName} {request?.tenant?.lastName}
                      </p>
                    </div>
                    <SendMessagePopOverFromServiceProvider receiverId={request?.tenant?.userId} />
                  </div>
                </div>
                <hr className="my-2" />
                <div className="mx-2">
                  <div className=" flex items-center justify-between gap-3">
                    <div>
                      <p className="text-gray-900 text-xs">Owner </p>
                      <p className="line-clamp-1 text-sm">
                        {request?.owner?.firstName} {request?.owner?.lastName}
                      </p>
                    </div>
                    <SendMessagePopOverFromServiceProvider receiverId={request?.owner?.userId} />
                  </div>
                </div>
                {/* button accept */}
                <div className="gap-4 px-2 my-4 w-full">
                  {/* <ApproveMaintenanceRequest reqId={singleReq?.maintenanceRequestId} /> */}
                  <button
                    type="button"
                    onClick={() => handleAcceptRequest(request?.maintenanceRequestId)}
                    className="text-primary w-full text-sm py-2 px-3 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/*  if no data */}
        {!isLoading && !allRequest?.data?.length > 0 && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <h3 className="lg:text-2xl">No Pending Order Found !!</h3>
          </div>
        )}

        <MaintenanceReqDetailsSidebar open={open} setOpen={setOpen} requestToDrawer={requestToDrawer} />
      </section>
    </div>
  );
};

export default AllPendingOrders;
