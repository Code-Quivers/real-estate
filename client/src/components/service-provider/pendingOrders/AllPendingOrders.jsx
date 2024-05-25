"use client";

import { fileUrlKey } from "@/configs/envConfig";
import { getType } from "@/constants/tableValues";
import {
  useAcceptMaintenanceRequestForServiceProviderMutation,
  useGetAllMaintenanceReqForServiceProviderQuery,
} from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import Image from "next/image";
import { useEffect } from "react";
import { Loader, Message, useToaster } from "rsuite";
import SendMessagePopOverFromServiceProvider from "../messaging/SendMessagePopOverFromServiceProvider";

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

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader size="lg" content="Loading..." />
        </div>
      )}

      {!isLoading && (
        <div className="mt-5 space-y-5">
          {allRequest?.data?.length > 0 &&
            allRequest?.data?.map((singleReq, idx) => (
              <div className="border grid grid-cols-12 bg-white rounded-md p-2" key={idx}>
                {console.log(singleReq)}
                <div className=" gap-6 lg:col-span-5 col-span-12">
                  <div className="">
                    <Image
                      className="h-[200px] object-cover rounded-md w-full"
                      alt="photo"
                      width={800}
                      height={250}
                      src={singleReq?.property?.images?.length > 0 ? `${fileUrlKey()}/${singleReq?.property?.images[0]}` : ""}
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-12 lg:px-4 py-2 w-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        Owner: {singleReq?.owner?.firstName} {singleReq?.owner?.lastName}{" "}
                      </h3>
                      <h3 className="font-medium text-xs px-3 py-1 bg-[#868E96] text-white rounded-full">{getType(singleReq?.priority)}</h3>
                    </div>
                    <h3 className="font-medium">Issue Location : {singleReq?.issueLocation}</h3>
                    <h3 className="font-medium">
                      Issue Type :{" "}
                      {singleReq?.issueType
                        ? singleReq?.issueType?.replace(/_/g, " ").charAt(0).toUpperCase() +
                          singleReq?.issueType?.replace(/_/g, " ").slice(1).toLowerCase()
                        : "N/A"}
                    </h3>
                  </div>

                  {/* <h3 className="text-xl  font-medium">PriorityType : {getType(singleReq?.priority)}</h3> */}

                  <div className="flex justify-end gap-4 max-lg:mt-3">
                    <div>
                      <button
                        type="button"
                        onClick={() => handleAcceptRequest(singleReq?.maintenanceRequestId)}
                        className="text-primary  text-sm py-1.5 px-10 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]  duration-300 transition-all"
                      >
                        Accept
                      </button>
                    </div>
                    <div>
                      <SendMessagePopOverFromServiceProvider receiverId={singleReq?.owner?.userId} />
                    </div>
                    {/* <Button className="!bg-primary !px-3 !py-2 !text-white w-full">Contact</Button> */}
                  </div>
                </div>
              </div>
            ))}
          {/*  if no data */}
          {!allRequest?.data?.length > 0 && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <h3 className="lg:text-2xl text-red-500">No Pending Order Found !!</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllPendingOrders;
