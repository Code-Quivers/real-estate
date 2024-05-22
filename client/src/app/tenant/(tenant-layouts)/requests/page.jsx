"use client";
import Image from "next/image";
import requestImage from "@/assets/tenant/AustralianHousing-scaled.webp";
import PrimaryButtonForTenant from "@/components/tenant/PrimaryButtonForTenant";
import { useGetMyRequestedMaintenanceQuery } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { Placeholder } from "rsuite";

const MyMaintenanceRequests = () => {
  // eslint-disable-next-line no-unused-vars
  const { data: myAllRequests, isError, isLoading, isFetching, error } = useGetMyRequestedMaintenanceQuery();
  return (
    <div className="text-center max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0 mx-auto">
      <h2 className="text-2xl mb-5">Requests you sent</h2>
      <div>
        {!isLoading &&
          myAllRequests?.data?.data?.length > 0 &&
          // eslint-disable-next-line no-unused-vars
          myAllRequests?.data?.data?.map((req) => (
            <div key={Math.random()} className="flex justify-between items-center border">
              <div className="flex justify-start items-center gap-5">
                <Image src={requestImage} className="h-32 object-cover" width={150} objectFit="cover" alt="Tenant avialable units" />
                <div className="text-start">
                  <h2>Home Owner Name</h2>
                  <h2>Home Owner Address</h2>
                  <h2>Priority Type</h2>
                  <h2 className="mt-6">
                    Status: <span className="text-green-400">Approved</span>
                  </h2>
                </div>
              </div>
              <div className="pr-5">
                <PrimaryButtonForTenant title="Send Request" />
              </div>
            </div>
          ))}

        {/* if no data found */}
        {!isLoading && !myAllRequests?.data?.data?.length > 0 && (
          <div className="mt-20">
            <h2>{`You haven't added any Maintenance Request`}</h2>
          </div>
        )}
        {isLoading && (
          <div className="mt-5 space-y-10">
            <Placeholder.Paragraph rowHeight={15} graph="image" active />
            <Placeholder.Paragraph rowHeight={15} graph="image" active />
            <Placeholder.Paragraph rowHeight={15} graph="image" active />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMaintenanceRequests;
