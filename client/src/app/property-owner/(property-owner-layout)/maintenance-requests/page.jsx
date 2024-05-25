"use client";
import SendMessagePopOverFromPropertyOwner from "@/components/property-owner/available-tenants/SendMessagePopOver";
import { fileUrlKey } from "@/configs/envConfig";
import { getType } from "@/constants/tableValues";
import {
  useAcceptMaintenanceRequestForOwnerMutation,
  useGetAllMaintenanceReqForOwnerQuery,
  useRejectMaintenanceRequestForOwnerMutation,
} from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import Image from "next/image";
import { useEffect } from "react";
import { Message, Notification, useToaster } from "rsuite";

const MaintenanceRequest = () => {
  const { data: maintenanceReq, isLoading } = useGetAllMaintenanceReqForOwnerQuery({});
  const toaster = useToaster();
  const [
    acceptMaintenanceRequestForOwner,
    { data: approveData, isLoading: isLoadingApprove, isError: isErrorApprove, isSuccess: isSuccessApprove, error: errorApprove },
  ] = useAcceptMaintenanceRequestForOwnerMutation();

  const handleAcceptRequest = async (reqId) => {
    await acceptMaintenanceRequestForOwner(reqId);
  };
  // ! side effect
  useEffect(() => {
    if (!isLoadingApprove && !isErrorApprove && isSuccessApprove) {
      toaster.push(
        <Message bordered showIcon type="success">
          <span className="lg:text-2xl">{approveData?.message || "Successfully updated"}</span>
        </Message>,
        {
          placement: "topEnd",
        },
      );
    }
    if (!isLoadingApprove && isErrorApprove && !isSuccessApprove && errorApprove) {
      toaster.push(
        <Message bordered showIcon type="error">
          <span className="lg:text-2xl">{errorApprove?.message || "Failed to Accept"}</span>
        </Message>,
        {
          placement: "topEnd",
        },
      );
    }
  }, [isLoadingApprove, isErrorApprove, isSuccessApprove, errorApprove, toaster]);

  // ! reject request
  const [
    rejectMaintenanceRequestForOwner,
    { data: rejectData, isLoading: isLoadingReject, isSuccess: isSuccessReject, isError: isErrorReject, error: errorReject },
  ] = useRejectMaintenanceRequestForOwnerMutation();

  // reject
  const handleRejectRequest = async (reqId) => {
    await rejectMaintenanceRequestForOwner(reqId);
  };

  // ! side effect

  useEffect(() => {
    if (!isLoadingReject && !isErrorReject && isSuccessReject) {
      toaster.push(
        <Notification header="Success" type="success">
          <span>{rejectData?.message || "Rejected"}</span>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
    if (!isLoadingReject && isErrorReject && !isSuccessReject && errorReject) {
      toaster.push(
        <Notification header="Error" type="error">
          <span>{errorReject?.message || "Failed to Accept"}</span>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingReject, rejectData, isErrorReject, errorReject, isSuccessReject, toaster]);

  return (
    <>
      <section className="max-w-5xl  mb-5 mt-14 mx-auto lg:px-5 2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl ">Maintenance Request</h2>
        </div>
        {/* requests */}

        {!isLoading && (
          <div className="mt-10 grid mx-3 lg:mx-0 gap-5">
            {maintenanceReq?.data?.length > 0 &&
              maintenanceReq?.data?.map((singleReq, index) => (
                <div className="border grid grid-cols-12 bg-white rounded-md p-2" key={index}>
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

                    <div className="grid grid-cols-3 gap-4 max-lg:mt-3">
                      {/* <ApproveMaintenanceRequest reqId={singleReq?.maintenanceRequestId} /> */}

                      <button
                        type="button"
                        onClick={() => handleAcceptRequest(singleReq?.maintenanceRequestId)}
                        className="text-primary w-full text-sm py-1.5 px-3 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(singleReq?.maintenanceRequestId)}
                        type="button"
                        className="!text-primary w-full text-sm py-1.5 px-3 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                      >
                        Reject
                      </button>
                      <SendMessagePopOverFromPropertyOwner receiverId={singleReq?.tenant?.userId} />
                      {/* <Button className="!bg-primary !px-3 !py-2 !text-white w-full">Contact</Button> */}
                    </div>
                  </div>
                </div>
              ))}

            {!maintenanceReq?.data?.length > 0 && (
              <div className="flex justify-center items-center min-h-[60vh]">
                <h3 className="lg:text-2xl text-red-500">No Maintenance Request Found !!</h3>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default MaintenanceRequest;
