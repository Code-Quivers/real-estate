"use client";

import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";
import { useState } from "react";
import SavedServiceProviderList from "@/components/property-owner/availableServiceProviders/SavedServiceProviderList";
import SavedServiceProviderModalDetails from "@/components/property-owner/saved-service-providers/SavedServiceProviderModalDetails";

const PropertyOwnerSavedServiceProviders = () => {
  const query = {};
  const [itemType, setItemType] = useState("SERVICE");
  query["itemType"] = itemType;

  const { data, isLoading } = useGetAllSavedItemsQuery({ ...query });
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-5 2xl:mx-auto lg:px-5 2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-3xl">Saved Service Providers</h2>
        </div>
        {/* saved service providers */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {!isLoading &&
            data?.data?.data?.length > 0 &&
            data?.data?.data?.map((singleReq, index) => (
              <div key={index}>
                <div className="bg-white border rounded-md shadow-sm">
                  <SavedServiceProviderList singleReq={singleReq}>
                    <div
                      onClick={() => {
                        setSelectedService(singleReq);
                        setServiceModalActive(true);
                      }}
                      className="px-3 space-y-0.5 *:hover:cursor-pointer"
                    >
                      <h3 type="button" className="text-sm  text-primary cursor-pointer font-bold">
                        {singleReq?.serviceProvider?.firstName} {singleReq?.serviceProvider?.lastName}
                      </h3>
                      <h3 className="text-sm">
                        Service Type:{" "}
                        {singleReq?.serviceProvider?.Service?.serviceType
                          ? singleReq?.serviceProvider?.Service?.serviceType.replace(/_/g, " ").charAt(0).toUpperCase() +
                            singleReq?.serviceProvider?.Service?.serviceType.replace(/_/g, " ").slice(1).toLowerCase()
                          : "N/A"}
                      </h3>
                      <h3 className="text-sm font-medium">
                        Service Price : $
                        {singleReq?.serviceProvider?.Service?.minPrice ? singleReq?.serviceProvider?.Service?.minPrice?.toLocaleString() : 0} - $
                        {singleReq?.serviceProvider?.Service?.maxPrice ? singleReq?.serviceProvider?.Service?.maxPrice?.toLocaleString() : 0}
                      </h3>
                    </div>
                  </SavedServiceProviderList>
                </div>
              </div>
            ))}
        </div>
        {/* if no data */}

        {!isLoading && !data?.data?.data?.length && (
          <div className="flex justify-center items-center min-h-[40vh]">
            <h2>No Saved Service Provider Found</h2>
          </div>
        )}
      </section>

      <SavedServiceProviderModalDetails isModalOpened={serviceModalActive} setModalOpened={setServiceModalActive} modalData={selectedService} />
    </>
  );
};

export default PropertyOwnerSavedServiceProviders;
