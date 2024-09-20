/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { Input, Pagination, SelectPicker } from "rsuite";
import { InputGroup } from "rsuite";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { serviceAvailability, serviceTypes } from "@/constants/serviceConst";
import { useGetAllServiceProvidersQuery } from "@/redux/features/serviceProvider/serviceProviderApi";
import AvailableServiceProviderModal from "@/components/property-owner/availableServiceProviders/AvailableServiceProviderModal";
import AvailableServiceProviderList from "@/components/property-owner/availableServiceProviders/AvailableServiceProviderList";
import { pricePicker } from "@/constants/selectPicker.const";
// !
const AvailableServiceProviders = () => {
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceAvailability, setSelectedServiceAvailability] = useState(undefined);
  const [selectedServiceType, setSelectedServiceType] = useState(undefined);

  // filter
  query["limit"] = size;
  query["page"] = page;
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  //

  query["sortOrder"] = sortOrder;
  query["sortBy"] = sortBy;
  query["limit"] = 20;

  query["serviceAvailability"] = selectedServiceAvailability;
  query["ServiceType"] = selectedServiceType;

  // debounce for slow search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data: allServiceProviderLists, isLoading, isFetching, isError } = useGetAllServiceProvidersQuery({ ...query });

  //
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-5 2xl:mx-auto lg:px-5 2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-3xl ">Service Providers</h2>
      </div>
      {/* search with price section start */}
      <div className="grid grid-cols-12 gap-3 mt-2">
        <div className="lg:col-span-3 col-span-6">
          <InputGroup size="lg" inside>
            <Input onChange={(e) => setSearchTerm(e)} placeholder="Service Provider" size="lg" />
            <InputGroup.Addon>
              <FaSearch size={15} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="lg:col-span-3 col-span-6">
          <SelectPicker
            placement="bottomEnd"
            size="lg"
            searchable={false}
            className="w-full"
            placeholder="Service Type"
            onChange={(value) => setSelectedServiceType(value)}
            data={serviceTypes}
          />
        </div>
        <div className="lg:col-span-3 col-span-6">
          <SelectPicker
            searchable={false}
            size="lg"
            placeholder="Price"
            data={pricePicker}
            onChange={(e) => {
              setSortBy("minPrice");
              setSortOrder(e);
            }}
            onClean={() => {
              setSortBy("createdAt");
              setSortOrder("");
            }}
            className="!w-full"
          />
        </div>
        <div className="lg:col-span-3 col-span-6">
          <SelectPicker
            size="lg"
            searchable={false}
            onChange={(value) => setSelectedServiceAvailability(value)}
            placement="bottomEnd"
            placeholder="Priority Availability"
            data={serviceAvailability}
            className="w-full"
          />
        </div>
      </div>

      {/* all cards */}

      {/* all cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {!isLoading &&
          allServiceProviderLists?.data?.data?.length > 0 &&
          allServiceProviderLists?.data?.data?.map((singleReq, index) => (
            <div key={index}>
              <div className="bg-white border rounded-md shadow-sm">
                <AvailableServiceProviderList singleReq={singleReq}>
                  <div
                    onClick={() => {
                      setSelectedService(singleReq);
                      setServiceModalActive(true);
                    }}
                    className="px-3 space-y-0.5 *:hover:cursor-pointer"
                  >
                    <h2 className="text-sm  text-primary cursor-pointer font-bold">
                      {singleReq?.firstName} {singleReq?.lastName}
                    </h2>
                    <h3 className="text-sm">
                      Service Type:{" "}
                      {singleReq?.Service?.serviceType
                        ? singleReq?.Service?.serviceType.replace(/_/g, " ").charAt(0).toUpperCase() +
                          singleReq?.Service?.serviceType.replace(/_/g, " ").slice(1).toLowerCase()
                        : "N/A"}
                    </h3>
                    <h3 className="text-sm font-medium">
                      Service Price : ${singleReq?.Service?.minPrice ? singleReq?.Service?.minPrice?.toLocaleString() : 0} - $
                      {singleReq?.Service?.maxPrice ? singleReq?.Service?.maxPrice?.toLocaleString() : 0}
                    </h3>
                  </div>
                </AvailableServiceProviderList>
              </div>
            </div>
          ))}
      </div>

      <div>
        {/* if no data */}
        {!isLoading && !allServiceProviderLists?.data?.data?.length > 0 && (
          <div className="flex justify-center items-center min-h-[16vh] ">
            <h2 className="text-3xl font-semibold text-rose-500">No Service Providers Found !</h2>
          </div>
        )}
        <>
          <AvailableServiceProviderModal isModalOpened={serviceModalActive} setModalOpened={setServiceModalActive} modalData={selectedService} />
        </>
      </div>
      {/* pagination */}
      <div className="mt-20 py-10 rounded-lg">
        <Pagination
          total={allServiceProviderLists?.data?.meta?.total}
          prev
          next
          ellipsis
          boundaryLinks
          maxButtons={1}
          size="md"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          limitOptions={[10, 20, 30, 50]}
          limit={size}
          onChangeLimit={(limitChange) => setSize(limitChange)}
          activePage={page}
          onChangePage={setPage}
        />
      </div>
    </section>
  );
};

export default AvailableServiceProviders;
