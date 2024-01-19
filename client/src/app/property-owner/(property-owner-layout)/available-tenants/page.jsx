/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { AutoComplete, Input, InputGroup, InputNumber, Loader } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";

import AvailableTenantsModal from "@/components/property-owner/available-tenants/AvailableTenantsModal";
import { useGetAllAvailableTenantsQuery } from "@/redux/features/tenant/tenantsApi";
import { useDebounced } from "@/redux/hook";

const PropertyOwnerServiceProviders = () => {
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [presentAddress, setPresentAddress] = useState("");

  // filter
  query["limit"] = size;
  query["page"] = page;
  // debounce for slow search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });
  if (!!debouncedTerm) query["searchTerm"] = debouncedTerm;

  const debouncedTermAddress = useDebounced({
    searchQuery: presentAddress,
    delay: 300,
  });
  if (!!debouncedTermAddress) query["presentAddress"] = debouncedTermAddress;

  const {
    data: allTenantsLists,
    isLoading,
    isFetching,
    isError,
  } = useGetAllAvailableTenantsQuery({ ...query });
  //
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-3xl ">Available Tenants</h2>
      </div>
      {/* search with price section start */}
      <div className="grid lg:grid-cols-7 gap-0.5 max-lg:gap-2 lg:flex w-full   mt-5 lg:mt-5   ">
        {/* tenant name */}
        <div className="max-lg:col-span-3 col-span-3 w-full">
          <InputGroup
            size="lg"
            inside
            className=" !w-full"
            style={{ borderRadius: "0 !important" }}
          >
            <Input
              className=" !w-full"
              onChange={(e) => setSearchTerm(e)}
              placeholder="Tenant Name"
              size="lg"
            />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        {/* address */}
        <div className=" md:col-span-2 w-full">
          <InputGroup
            size="lg"
            inside
            className=" !w-full"
            style={{ borderRadius: "0 !important" }}
          >
            <Input
              className=" !w-full"
              onChange={(e) => setPresentAddress(e)}
              placeholder="Address"
              size="lg"
            />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        {/* rent */}
        <div className=" md:col-span-2  w-full ">
          <InputGroup
            size="lg"
            inside
            className="lg:!w-full "
            style={{ borderRadius: "0 !important" }}
          >
            <Input placeholder="Rent" size="lg" />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
      </div>

      {/* all cards */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader size="lg" content="Getting Available Tenants..." />
        </div>
      )}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {!isLoading && allTenantsLists?.data?.data?.length ? (
          allTenantsLists?.data?.data?.map((singleReq) => (
            <div
              key={Math.random()}
              onClick={() => {
                setSelectedService(singleReq);
                setServiceModalActive(true);
              }}
              className=" col-span-1  border flex justify-between items-center pl-3 pr-5 shadow-lg  rounded-3xl border-[#acacac]  gap-2"
            >
              <div>
                <Image
                  className="w-[80px] h-[65px] object-cover   rounded-full  "
                  src={profileLogo}
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
              <div className=" outline outline-[6px] outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[70px] h-[50px]">
                <div className=" flex w-full flex-col justify-center items-center">
                  <span>9</span>
                  <span className="w-[70%] border-t border-[#b6b6b6]" />
                  <span>10</span>
                </div>
              </div>
            </div>
            // </Whisper>
          ))
        ) : (
          <div className="flex justify-center items-center pt-12  pb-8">
            <p>No Available Tenants...</p>
          </div>
        )}

        <>
          <AvailableTenantsModal
            isModalOpened={serviceModalActive}
            setModalOpened={setServiceModalActive}
            modalData={selectedService}
          />
        </>
      </div>
    </section>
  );
};

export default PropertyOwnerServiceProviders;
