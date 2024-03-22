"use client";
import { fileUrlKey } from "@/configs/envConfig";
import { getType } from "@/constants/tableValues";
import {
  useAcceptMaintenanceRequestForOwnerMutation,
  useGetAllMaintenanceReqForOwnerQuery,
} from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import Image from "next/image";
import { useEffect } from "react";
import { Button, Message, useToaster } from "rsuite";

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

  return (
    <>
      <section className="max-w-[1050px]  mb-5 mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl ">Maintenance Request</h2>
        </div>
        {/* requests */}

        {!isLoading && (
          <div className="mt-10  space-y-5">
            {maintenanceReq?.data?.length > 0 &&
              maintenanceReq?.data?.map((singleReq) => (
                <div className="border grid grid-cols-9 items-center border-[#acacac]  gap-6" key={Math.random()}>
                  <div className="col-span-8 flex gap-6">
                    <div className="border border-[#acacac]">
                      <Image
                        className="w-[500px] h-[250px] object-cover object-left"
                        // src={singleReq.image}
                        alt="photo"
                        width={500}
                        height={250}
                        src={singleReq?.property?.images?.length > 0 ? `${fileUrlKey()}/${singleReq?.property?.images[0]}` : ""}
                      />
                    </div>
                    <div className="p-5 flex justify-between w-full ">
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium">
                          Home Owner Name : {singleReq?.owner?.firstName} {singleReq?.owner?.lastName}{" "}
                        </h3>
                        <h3 className="text-xl font-medium">Issue Location : {singleReq.issueLocation}</h3>
                        <h3 className="text-xl  font-medium">PriorityType : {getType(singleReq?.priority)}</h3>
                        <h3 className="text-xl  font-medium">PriorityType : {getType(singleReq?.priority)}</h3>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="col-span-1 space-y-3">
                    {/* <ApproveMaintenanceRequest reqId={singleReq?.maintenanceRequestId} /> */}

                    <Button onClick={() => handleAcceptRequest(singleReq?.maintenanceRequestId)} className="!bg-primary !px-3 !py-2 !text-white">
                      Accept
                    </Button>
                    <Button className="!bg-primary !px-3 !py-2 !text-white">Reject</Button>
                    <Button className="!bg-primary !px-3 !py-2 !text-white">Contact</Button>
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
