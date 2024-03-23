"use client";

import requestApartment from "@/assets/propertyOwner/requestApartment.jpg";
import { fileUrlKey } from "@/configs/envConfig";
import { getType } from "@/constants/tableValues";
import {
  useAcceptMaintenanceRequestForServiceProviderMutation,
  useGetAllMaintenanceReqForServiceProviderQuery,
} from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import Image from "next/image";
import { useEffect } from "react";
import { Button, Loader, Message, useToaster } from "rsuite";

const AllPendingOrders = () => {
  const { data: allRequest, isLoading, isError, isSuccess, error } = useGetAllMaintenanceReqForServiceProviderQuery({});
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
            allRequest?.data?.map((singleReq) => (
              <div className="border lg:flex  shadow-lg border-[#acacac]   lg:gap-3 xl:gap-6 " key={Math.random()}>
                <div className="border max-md:w-full  border-[#acacac]">
                  <Image
                    className="w-full md:w-full lg:w-[300px] xl:w-[500px] h-full lg:h-[180px] object-cover object-left"
                    width={500}
                    height={200}
                    src={singleReq?.property?.images?.length > 0 ? `${fileUrlKey()}/${singleReq?.property?.images[1]}` : requestApartment}
                    alt="photo"
                  />
                </div>
                <div className="p-3 lg:p-3 flex  max-lg:flex-col justify-between w-full   lg:gap-2">
                  <div className="space-y-3  ">
                    <h3 className="text-xl font-medium">
                      Home Owner Name : {singleReq?.owner?.firstName} {singleReq?.owner?.lastName}
                    </h3>
                    <h3 className="text-xl font-medium">Issue Location : {singleReq?.issueLocation}</h3>
                    <h3 className="text-xl font-medium">Priority Type: {getType(singleReq?.priority)}</h3>
                    <h3 className="text-xl font-medium">Issue Type: {getType(singleReq?.issueType)}</h3>
                  </div>
                  <div className="mt-3 flex flex-col  space-y-4">
                    <Button onClick={() => handleAcceptRequest(singleReq?.maintenanceRequestId)} className="!bg-primary !px-3 !py-2 !text-white">
                      Accept
                    </Button>

                    <Button className="!bg-primary !px-3 !py-2 !text-white">Contact</Button>
                  </div>
                </div>
              </div>
            ))}
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
