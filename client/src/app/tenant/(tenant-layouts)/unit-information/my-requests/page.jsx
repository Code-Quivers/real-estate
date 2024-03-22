"use client";

import { useGetMyRequestedMaintenanceQuery } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";

const MyMaintenanceRequests = () => {
  const { data, isError, isLoading } = useGetMyRequestedMaintenanceQuery();
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
      <div>
        <h2>My Maintenance Requests | total {data?.data?.length}</h2>
      </div>
    </div>
  );
};

export default MyMaintenanceRequests;
