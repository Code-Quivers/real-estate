/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { Input, InputGroup, InputNumber, Pagination } from "rsuite";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { useGetAllAvailableTenantsQuery } from "@/redux/features/tenant/tenantsApi";
import AvailableTenantsDetailModal from "@/components/property-owner/available-tenants/AvailableTenantsModal";
import AvailableTenantsList from "@/components/property-owner/available-tenants/AvailableTenantsList";
import TenantCardSkeleton from "@/components/loading-skeleton/TenantCardSkeleton";

const PropertyOwnerAvailableTenants = () => {
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [rentAmount, setRentAmount] = useState("");

  // filter
  query["limit"] = size;
  query["page"] = page;
  // ! debounce for slow search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });
  if (!!debouncedTerm) query["searchTerm"] = debouncedTerm;
  // ! rent amount
  const debouncedTermRent = useDebounced({
    searchQuery: rentAmount,
    delay: 300,
  });
  if (!!debouncedTermRent) query["rent"] = debouncedTermRent;
  // ! address
  const debouncedTermAddress = useDebounced({
    searchQuery: presentAddress,
    delay: 300,
  });
  if (!!debouncedTermAddress) query["searchTerm"] = debouncedTermAddress;

  const { data: allTenantsLists, isLoading } = useGetAllAvailableTenantsQuery({ ...query });
  //
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setTenantDetails] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="md:text-3xl mb-3">Available Tenants</h2>
      </div>
      {/* search with price section start */}

      <div className="flex justify-end gap-2">
        {/* tenant name or address. search with */}
        <div className="w-full">
          <InputGroup size="lg" inside className="!w-full">
            <Input className="!w-full" onChange={(e) => setSearchTerm(e)} placeholder="Search with Tenant Name or Address" size="lg" />
            <InputGroup.Addon>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>

        {/* rent */}
        <div className="">
          <InputGroup size="lg" inside className="!w-full">
            <Input type="number" buttonAppearance="subtle" min={0} onChange={(e) => setRentAmount(e)} placeholder="Rent" size="lg" />
            <InputGroup.Addon>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
      </div>

      {/* all cards */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 justify-center   py-10">
          <TenantCardSkeleton />
          <TenantCardSkeleton />
          <TenantCardSkeleton />
          <TenantCardSkeleton />
          <TenantCardSkeleton />
          <TenantCardSkeleton />
        </div>
      )}

      {/* all cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {!isLoading &&
          allTenantsLists?.data?.data?.length > 0 &&
          allTenantsLists?.data?.data?.map((singleReq, index) => (
            <div key={index}>
              <div className="bg-white border rounded-md shadow-sm">
                <AvailableTenantsList singleReq={singleReq}>
                  <div
                    onClick={() => {
                      setTenantDetails(singleReq);
                      setServiceModalActive(true);
                    }}
                    className="px-3 space-y-0.5 *:hover:cursor-pointer"
                  >
                    <button type="button" className="text-sm  text-primary cursor-pointer font-bold">
                      {singleReq?.firstName} {singleReq?.lastName}
                    </button>
                    <h3 className="text-sm font-medium">Place to rent : {singleReq?.placeToRent ? singleReq?.placeToRent : "N/A"}</h3>
                    <h3 className="text-sm font-medium">
                      Rent willing to pay: {`${singleReq?.affordableRentAmount ? `$ ${singleReq?.affordableRentAmount?.toLocaleString()}` : "N/A"}`}
                    </h3>
                  </div>
                </AvailableTenantsList>
              </div>
            </div>
          ))}
      </div>
      {/* if no data is available */}
      {!isLoading && !allTenantsLists?.data?.data?.length && (
        <div className="flex justify-center items-center pt-12  pb-8">
          <p className="text-2xl font-semibold text-rose-500 text-center w-full">No available tenants found...</p>
        </div>
      )}
      {/* pagination */}
      <div className="mt-20   py-2 px-1 rounded-lg">
        <Pagination
          total={allTenantsLists?.data?.meta?.total}
          prev
          next
          ellipsis
          size="sm"
          layout={["total", "-", "limit", "|", "pager"]}
          limitOptions={[10, 20, 30, 50]}
          limit={size}
          onChangeLimit={(limitChange) => setSize(limitChange)}
          activePage={page}
          onChangePage={setPage}
        />
      </div>

      <>
        <AvailableTenantsDetailModal isModalOpened={serviceModalActive} setModalOpened={setServiceModalActive} modalData={selectedService} />
      </>
    </section>
  );
};

export default PropertyOwnerAvailableTenants;
