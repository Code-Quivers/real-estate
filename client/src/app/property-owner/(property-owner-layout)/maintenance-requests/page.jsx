"use client";
import SendMessagePopOverFromPropertyOwner from "@/components/property-owner/available-tenants/SendMessagePopOver";
import MaintenanceRequestSwiper from "@/components/property-owner/maintenance-request/MaintenanceRequestSwiper";
import PropertySingleReqDrawer from "@/components/property-owner/maintenance-request/PropertySingleReqDrawer";
import { getType } from "@/constants/tableValues";
import {
  useAcceptMaintenanceRequestForOwnerMutation,
  useGetAllMaintenanceReqForOwnerQuery,
  useRejectMaintenanceRequestForOwnerMutation,
} from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { useEffect, useState } from "react";
import { Message, Notification, useToaster } from "rsuite";

const MaintenanceRequest = () => {
  const [open, setOpen] = useState(false);
  const [requestToDrawer, setRequestToDrawer] = useState(null);
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
      <section className="max-w-6xl min-h-screen mt-14 mx-auto lg:px-5 2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl ">Maintenance Request</h2>
        </div>
        {/* requests */}

        {!isLoading && (
          <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-3 lg:mx-0 gap-5">
            {maintenanceReq?.data?.length > 0 &&
              maintenanceReq?.data?.map((singleReq, index) => (
                <div className="border bg-white rounded-lg shadow-sm" key={index}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                      setRequestToDrawer(singleReq);
                    }}
                  >
                    {/* image */}
                    <MaintenanceRequestSwiper requestImages={singleReq?.property?.images} />
                    {/* issue priority and description and status */}
                    <div className="mx-2">
                      <div className="w-full flex flex-col justify-between">
                        <div>
                          {/* <h3 className="font-medium">Issue Location : {singleReq?.issueLocation}</h3> */}
                          <div className="mt-2 flex items-center justify-between">
                            <h3 className="font-semibold line-clamp-1 text-primary">
                              Issue:{" "}
                              {singleReq?.issueType
                                ? singleReq?.issueType?.replace(/_/g, " ").charAt(0).toUpperCase() +
                                  singleReq?.issueType?.replace(/_/g, " ").slice(1).toLowerCase()
                                : "N/A"}
                            </h3>
                            <span
                              className={`${singleReq?.status === "PENDING" ? "bg-yellow-100  border-yellow-500 text-yellow-600" : singleReq?.status == "APPROVED" ? "bg-blue-100 text-blue-600 border-blue-500" : ""} px-2.5 font-medium text-xs border rounded-full`}
                            >
                              {singleReq?.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm rounded-full">{getType(singleReq?.priority)}</h3>
                          </div>
                          <p className="line-clamp-3 text-sm text-gray-900 mt-2">{singleReq?.description}</p>
                        </div>

                        {/* <h3 className="text-xl  font-medium">PriorityType : {getType(singleReq?.priority)}</h3> */}
                      </div>
                    </div>
                  </div>
                  <hr className="my-2" />
                  {/* tenants and contact */}
                  <div className="mx-2">
                    <div className=" flex items-center justify-between gap-3">
                      <div>
                        <p className="text-gray-800">Tenant</p>
                        <p className="line-clamp-1">
                          {singleReq?.tenant?.firstName} {singleReq?.tenant?.lastName}
                        </p>
                      </div>
                      <SendMessagePopOverFromPropertyOwner receiverId={singleReq?.tenant?.userId} />
                    </div>
                  </div>

                  {/* button accept reject */}
                  <div className="grid grid-cols-2 gap-4 px-2 my-4">
                    {/* <ApproveMaintenanceRequest reqId={singleReq?.maintenanceRequestId} /> */}
                    <button
                      type="button"
                      onClick={() => handleAcceptRequest(singleReq?.maintenanceRequestId)}
                      className="text-primary w-full text-sm py-2 px-3 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(singleReq?.maintenanceRequestId)}
                      type="button"
                      className="w-full text-sm py-2 px-3 font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
        {!isLoading && !maintenanceReq?.data?.length > 0 && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <h3 className="text-xl">No Maintenance Request Found !!</h3>
          </div>
        )}
      </section>
      <PropertySingleReqDrawer open={open} setOpen={setOpen} requestToDrawer={requestToDrawer} />
    </>
  );
};

export default MaintenanceRequest;
