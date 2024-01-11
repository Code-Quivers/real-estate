/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { SelectPicker } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { serviceAvailability, serviceTypes } from "@/constants/serviceConst";
import { useGetAllServiceProvidersQuery } from "@/redux/features/serviceProvider/serviceProviderApi";
import AvailableServiceProviderModal from "@/components/property-owner/availableServiceProviders/AvailableServiceProviderModal";
// !
const PropertyOwnerServiceProviders = () => {
  const datas = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
    "Louisa",
    "Lester",
    "Lola",
    "Lydia",
    "Hal",
    "Hannah",
    "Harriet",
    "Hattie",
    "Hazel",
    "Hilda",
  ];

  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceAvailability, setSelectedServiceAvailability] =
    useState(undefined);
  const [selectedServiceType, setSelectedServiceType] = useState(undefined);

  // filter
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["serviceAvailability"] = selectedServiceAvailability;
  query["serviceType"] = selectedServiceType;

  // debounce for slow search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allServiceProviderLists,
    isLoading,
    isFetching,
    isError,
  } = useGetAllServiceProvidersQuery({ ...query });

  //
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-4xl ">Service Providers</h2>
      </div>
      {/* search with price section start */}
      <div className="grid grid-cols-5 max-lg:gap-2 lg:flex w-full border  mt-5 lg:mt-10 gap-0.5   ">
        <div className="max-lg:col-span-3">
          <InputGroup
            size="lg"
            inside
            className="lg:!w-[400px]"
            style={{ borderRadius: "0 !important" }}
          >
            <AutoComplete
              onChange={(e) => setSearchTerm(e)}
              placeholder="Service Provider"
              size="lg"
              data={datas}
            />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="max-lg:col-span-2">
          <SelectPicker
            placement="bottomEnd"
            size="lg"
            searchable={false}
            placeholder="Service Type"
            onChange={(value) => setSelectedServiceType(value)}
            data={serviceTypes}
            style={{
              borderRadius: "0px !important",
              width: "210px !important",
            }}
          />
        </div>
        <div className="max-lg:col-span-3">
          <InputGroup
            size="lg"
            inside
            className="max-lg:!w-full lg:!w-[200px] rounded-none"
            style={{ borderRadius: "0 !important" }}
          >
            <AutoComplete size="lg" placeholder="Price" data={datas} />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="max-lg:col-span-2">
          <SelectPicker
            size="lg"
            searchable={false}
            onChange={(value) => setSelectedServiceAvailability(value)}
            placement="bottomEnd"
            placeholder="Priority Availability"
            data={serviceAvailability}
            style={{
              borderRadius: "0px !important",
              width: "200px !important",
            }}
          />
        </div>
      </div>

      {/* all cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {allServiceProviderLists?.data?.data?.length
          ? allServiceProviderLists?.data?.data?.map((singleReq) => (
              <div
                key={Math.random()}
                onClick={() => {
                  setSelectedService(singleReq);
                  setServiceModalActive(true);
                }}
                className=" col-span-1  border flex shadow-lg rounded-lg justify-between items-center px-5 border-[#acacac]  gap-2"
              >
                <div>
                  <Image
                    className="w-[80px] h-[65px] object-cover   rounded-full  "
                    src={profileLogo}
                    alt="Profile Photo"
                  />
                </div>
                <div className="p-5 flex justify-between w-full ">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">
                      {singleReq?.firstName} &nbsp;
                      {singleReq?.lastName}
                    </h3>

                    <h3 className="text-base font-medium">
                      Service Type :{" "}
                      {singleReq?.Service?.serviceType ?? "Not Found"}
                    </h3>
                    <h3 className="text-base font-medium">
                      Service Price : $
                      {singleReq?.Service?.servicePriceRange ?? 1000}
                    </h3>
                  </div>
                </div>
                <div className=" outline outline-[6px] outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[75px] h-[50px]">
                  <div className=" flex w-full flex-col justify-center items-center">
                    <span>9</span>
                    <span className="w-[70%] border-t border-[#b6b6b6]" />
                    <span>10</span>
                  </div>
                </div>
              </div>
            ))
          : "No data"}

        <>
          <AvailableServiceProviderModal
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
