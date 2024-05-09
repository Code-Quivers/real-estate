"use client";

import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";
import { useState } from "react";
import { Loader } from "rsuite";
import SavedTenantLists from "@/components/property-owner/saved-tenants/SavedTenantList";
import SavedTenantModalDetails from "@/components/property-owner/saved-tenants/SavedTenantModalDetails";

const PropertyOwnerSavedTenants = () => {
  const query = {};

  const [itemType, setItemType] = useState("TENANT");

  query["itemType"] = itemType;

  const { data, isLoading } = useGetAllSavedItemsQuery({ ...query });
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setTenantDetails] = useState(null);

  return (
    <>
      <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl font-medium">Saved Tenants</h2>
        </div>
        {/* saved tenants */}
        {isLoading && (
          <div className="py-5 flex justify-center">
            <Loader size="lg" />
          </div>
        )}
        <div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {!isLoading &&
              data?.data?.data?.length > 0 &&
              data?.data?.data?.map((singleReq, index) => (
                <>
                  <div key={index}>
                    <div className="bg-white border rounded-md shadow-sm">
                      <SavedTenantLists isLoadingSaved={isLoading} singleReq={singleReq}>
                        <div
                          onClick={() => {
                            setTenantDetails(singleReq);
                            setServiceModalActive(true);
                          }}
                          className="px-3 space-y-0.5 *:hover:cursor-pointer"
                        >
                          <button type="button" className="text-sm  text-primary cursor-pointer font-bold">
                            {singleReq?.tenant?.firstName} {singleReq?.tenant?.lastName}
                          </button>
                          <h3 className="text-sm font-medium">
                            Place to rent : {singleReq?.tenant?.placeToRent ? singleReq?.tenant?.placeToRent : "-"}
                          </h3>
                          <h3 className="text-sm font-medium">
                            Rent willing to pay: {`${singleReq?.tenant?.affordableRentAmount ? `$ ${singleReq?.tenant?.affordableRentAmount}` : "-"}`}
                          </h3>
                        </div>
                      </SavedTenantLists>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        {/* if no data */}
        <div>
          {!isLoading && !data?.data?.data?.length && (
            <div className="flex justify-center items-center min-h-[40vh]">
              <h2>No Saved Tenant Found!</h2>
            </div>
          )}
        </div>
      </section>

      <>
        <SavedTenantModalDetails isModalOpened={serviceModalActive} setModalOpened={setServiceModalActive} modalData={selectedService} />
      </>
    </>
  );
};

export default PropertyOwnerSavedTenants;
