/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { Input, InputGroup, InputNumber, Loader, Pagination, Progress } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetAllAvailableTenantsQuery } from "@/redux/features/tenant/tenantsApi";
import AvailableTenantsDetailModal from "@/components/property-owner/available-tenants/AvailableTenantsModal";

const PropertyOwnerServiceProviders = () => {
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
  if (!!debouncedTermAddress) query["presentAddress"] = debouncedTermAddress;

  const { data: allTenantsLists, isLoading, isFetching, isError } = useGetAllAvailableTenantsQuery({ ...query });
  //
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-3xl ">Available Tenants | Total {allTenantsLists?.data?.meta?.total}</h2>
      </div>
      {/* search with price section start */}
      <div className="">
        <div className="grid lg:grid-cols-7 gap-0.5 max-lg:gap-2 lg:flex w-full   mt-5 lg:mt-5   ">
          {/* tenant name */}
          <div className="max-lg:col-span-3 col-span-3 w-full">
            <InputGroup size="lg" inside className=" !w-full" style={{ borderRadius: "0 !important" }}>
              <Input className=" !w-full" onChange={(e) => setSearchTerm(e)} placeholder="Tenant Name" size="lg" />
              <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
                <FaSearch size={20} />
              </InputGroup.Addon>
            </InputGroup>
          </div>
          {/* address */}
          <div className=" md:col-span-2 w-full">
            <InputGroup size="lg" inside className=" !w-full" style={{ borderRadius: "0 !important" }}>
              <Input className=" !w-full" onChange={(e) => setPresentAddress(e)} placeholder="Address" size="lg" />
              <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
                <FaSearch size={20} />
              </InputGroup.Addon>
            </InputGroup>
          </div>
          {/* rent */}
          <div className=" md:col-span-2  w-full ">
            <InputGroup size="lg" inside className="lg:!w-full " style={{ borderRadius: "0 !important" }}>
              <InputNumber onChange={(e) => setRentAmount(e)} placeholder="Rent" size="lg" />
              <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
                <FaSearch size={20} />
              </InputGroup.Addon>
            </InputGroup>
          </div>
        </div>
      </div>

      {/* all cards */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader size="lg" content="Getting Available Tenants..." />
        </div>
      )}

      {/* all cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {!isLoading &&
          allTenantsLists?.data?.data?.length > 0 &&
          allTenantsLists?.data?.data?.map((singleReq) => (
            <div
              key={Math.random()}
              onClick={() => {
                setSelectedService(singleReq);
                setServiceModalActive(true);
              }}
              className=" col-span-1  border flex justify-between items-center pl-3 pr-5 shadow-lg  rounded-lg border-[#acacac]  gap-2"
            >
              <div>
                <Image
                  width={100}
                  height={100}
                  className="w-[100px]  object-cover   rounded-full  "
                  src={singleReq?.profileImage ? `${fileUrlKey()}/${singleReq?.profileImage}` : profileLogo}
                  alt="photo"
                />
              </div>
              <div className="p-3 flex justify-between w-full ">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium">
                    {singleReq?.firstName} {singleReq?.lastName}
                  </h3>
                  <h3 className="text-sm font-medium">Place to rent</h3>
                  <h3 className="text-sm font-medium">Rent willing to pay</h3>
                </div>
              </div>
              <div style={{ width: 100, marginTop: 10 }}>
                <Progress.Circle percent="90" strokeColor="green" />
              </div>
            </div>
            // </Whisper>
          ))}
      </div>
      {/* if no data is available */}
      {!isLoading && !allTenantsLists?.data?.data?.length && (
        <div className="flex justify-center items-center pt-12  pb-8">
          <p className="text-2xl font-semibold text-rose-500 text-center w-full">No Available Tenants Found...</p>
        </div>
      )}
      {/* pagination */}
      <div className="mt-20">
        <Pagination
          total={allTenantsLists?.data?.meta?.total}
          prev
          next
          ellipsis
          // boundaryLinks
          // maxButtons={1}
          size="md"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
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

export default PropertyOwnerServiceProviders;
