/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { Input, InputGroup, InputNumber, Loader, Pagination, Progress } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetAllAvailableTenantsQuery } from "@/redux/features/tenant/tenantsApi";
import AvailableTenantsDetailModal from "@/components/property-owner/available-tenants/AvailableTenantsModal";
import AvailableTenantsList from "@/components/property-owner/available-tenants/AvailableTenantsList";

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

  const { data: allTenantsLists, isLoading } = useGetAllAvailableTenantsQuery({ ...query });
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
        <div className="grid lg:grid-cols-7 gap-2 max-lg:gap-2 lg:flex w-full   mt-5 lg:mt-5   ">
          {/* tenant name */}
          <div className="max-lg:col-span-3 col-span-3 w-full">
            <InputGroup size="lg" inside className="!w-full" >
              <Input className="!w-full" onChange={(e) => setSearchTerm(e)} placeholder="Tenant Name" size="lg" />
              <InputGroup.Addon>
                <FaSearch size={20} />
              </InputGroup.Addon>
            </InputGroup>
          </div>
          {/* address */}
          <div className=" md:col-span-2 w-full">
            <InputGroup size="lg" inside className=" !w-full" >
              <Input className=" !w-full" onChange={(e) => setPresentAddress(e)} placeholder="Address" size="lg" />
              <InputGroup.Addon>
                <FaSearch size={20} />
              </InputGroup.Addon>
            </InputGroup>
          </div>
          {/* rent */}
          <div className=" md:col-span-2 w-full">
            <InputGroup size="lg" inside className="!w-full ">
              <InputNumber onChange={(e) => setRentAmount(e)} placeholder="Rent" size="lg" />
              <InputGroup.Addon>
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
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {!isLoading &&
          allTenantsLists?.data?.data?.length > 0 &&
          allTenantsLists?.data?.data?.map((singleReq, index) => (
            <AvailableTenantsList key={index} singleReq={singleReq} />
            // <div
            //   key={Math.random()}
            //   onClick={() => {
            //     setSelectedService(singleReq);
            //     setServiceModalActive(true);
            //   }}
            //   className="bg-white border rounded-md"
            // >
            //   <div className="">
            //     <Image
            //       width={100}
            //       height={100}
            //       className="w-[100px] object-cover rounded-full  "
            //       src={singleReq?.profileImage ? `${fileUrlKey()}/${singleReq?.profileImage}` : profileLogo}
            //       alt="photo"
            //     />
            //     <div className="px-3">
            //       <div className="space-y-0.5">
            //         <h3 className="text-sm font-medium">
            //           {singleReq?.firstName} {singleReq?.lastName}
            //         </h3>
            //         <h3 className="text-sm font-medium">Place to rent</h3>
            //         <h3 className="text-sm font-medium">Rent willing to pay: ${singleReq?.affordableRentAmount?.toFixed(2)}</h3>
            //       </div>
            //     </div>
            //   </div>

            //   {/* <div style={{ width: 100, marginTop: 10 }}>
            //     <Progress.Circle percent="90" strokeColor="green" />
            //   </div> */}
            //   <div className="px-3 my-3 flex gap-3">
            //     <button className="flex gap-1 items-center justify-center w-full text-sm text-primary  py-1.5 font-semibold rounded-md bg-[#E8F0FE]">
            //       <CiBookmark size={14} /> Save
            //     </button>
            //     <button className="text-primary w-full text-sm py-1.5 font-semibold rounded-md bg-[#E8F0FE]">Contact</button>
            //     <button className="text-primary w-full text-sm py-1.5 font-semibold rounded-md bg-[#E8F0FE]">Add</button>
            //   </div>
            // </div>
          ))}
      </div>
      {/* if no data is available */}
      {!isLoading && !allTenantsLists?.data?.data?.length && (
        <div className="flex justify-center items-center pt-12  pb-8">
          <p className="text-2xl font-semibold text-rose-500 text-center w-full">No available tenants found...</p>
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
