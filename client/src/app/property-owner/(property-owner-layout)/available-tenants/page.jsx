/* eslint-disable no-extra-boolean-cast */
"use client";
import { FaSearch } from "react-icons/fa";
import { Popover, Whisper } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";

import AvailableTenantsModal from "@/components/property-owner/available-tenants/AvailableTenantsModal";
import { useGetAllAvailableTenantsQuery } from "@/redux/features/tenant/tenantsApi";
import { useDebounced } from "@/redux/hook";

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

  const allRequest = [
    {
      serviceProviderName: "Service Provider Name",
      serviceType: "Service Type",
      priorityType: "Priority Type",
      servicePrice: 200,
      image: profileLogo,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, autem facere? Nam ab provident corrupti. Ducimus quos placeat omnis iusto iure, minus vel dolores repellat distinctio culpa, labore aut natus molestias suscipit. Possimus quis mollitia reiciendis quod nisi? Iusto quod pariatur corporis et ab maiores rem sit commodi esse at.",
      cancellationPolicy:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati dolor voluptate deserunt quis voluptatem nemo modi fuga temporibus dignissimos, voluptatum, placeat culpa vel, natus animi. Suscipit quis natus cum officiis quos rerum praesentium at doloremque non ipsa laudantium mollitia aspernatur provident magni ea architecto vel facere voluptates, porro vitae.",
    },
    {
      serviceProviderName: "Service Provider Name",
      serviceType: "Service Type",
      priorityType: "Priority Type",
      servicePrice: 5200,
      image: profileLogo,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, autem facere? Nam ab provident corrupti. Ducimus quos placeat omnis iusto iure, minus vel dolores repellat distinctio culpa, labore aut natus molestias suscipit. Possimus quis mollitia reiciendis quod nisi? Iusto quod pariatur corporis et ab maiores rem sit commodi esse at.",
      cancellationPolicy:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati dolor voluptate deserunt quis voluptatem nemo modi fuga temporibus dignissimos, voluptatum, placeat culpa vel, natus animi. Suscipit quis natus cum officiis quos rerum praesentium at doloremque non ipsa laudantium mollitia aspernatur provident magni ea architecto vel facere voluptates, porro vitae.",
    },
    {
      serviceProviderName: "Service Provider Name",
      serviceType: "Service Type",
      priorityType: "Priority Type",
      servicePrice: 400,
      image: profileLogo,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, autem facere? Nam ab provident corrupti. Ducimus quos placeat omnis iusto iure, minus vel dolores repellat distinctio culpa, labore aut natus molestias suscipit. Possimus quis mollitia reiciendis quod nisi? Iusto quod pariatur corporis et ab maiores rem sit commodi esse at.",
      cancellationPolicy:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati dolor voluptate deserunt quis voluptatem nemo modi fuga temporibus dignissimos, voluptatum, placeat culpa vel, natus animi. Suscipit quis natus cum officiis quos rerum praesentium at doloremque non ipsa laudantium mollitia aspernatur provident magni ea architecto vel facere voluptates, porro vitae.",
    },
  ];
  const query = {};
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFactory, setSelectedFactory] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  // filter
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["factoryId"] = selectedFactory;
  query["itemId"] = selectedItem;
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;
  // debounce for slow search
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allTenantsLists,
    isLoading,
    isFetching,
    isError,
  } = useGetAllAvailableTenantsQuery({ ...query });
  //
  console.log(allTenantsLists);
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-3xl ">Available Tenants</h2>
      </div>
      {/* search with price section start */}
      <div className="grid grid-cols-7 gap-0.5 max-lg:gap-2 lg:flex w-full   mt-5 lg:mt-5   ">
        {/* tenant name */}
        <div className="max-lg:col-span-3 col-span-3 w-full">
          <InputGroup size="lg" inside style={{ borderRadius: "0 !important" }}>
            <AutoComplete
              onChange={(e) => setSearchTerm(e)}
              placeholder="Tenant Name"
              size="lg"
              data={datas}
            />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        {/* address */}
        <div className="max-lg:col-span-2 col-span-2 w-full">
          <InputGroup
            size="lg"
            inside
            className="lg:!w-full"
            style={{ borderRadius: "0 !important" }}
          >
            <AutoComplete
              onChange={(e) => console.log(e)}
              placeholder="Address"
              size="lg"
              data={datas}
            />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        {/* rent */}
        <div className="max-lg:col-span-2 col-span-2  w-full ">
          <InputGroup
            size="lg"
            inside
            className="lg:!w-full "
            style={{ borderRadius: "0 !important" }}
          >
            <AutoComplete placeholder="Rent" size="lg" data={datas} />
            <InputGroup.Addon style={{ backgroundColor: "#fff" }}>
              <FaSearch size={20} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
      </div>

      {/* all cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {allTenantsLists?.data?.data?.length &&
          allTenantsLists?.data?.data?.map((singleReq) => (
            // <Whisper
            //   placement="bottom"
            //   trigger="hover"
            //   controlId="control-id-hover"
            //   speaker={
            //     <Popover>
            //       <div className="flex gap-2 border rounded-2xl overflow-hidden shadow items-stretch">
            //         <div>
            //           <Image
            //             className="w-[80px] bg-red-800 h-full object-cover     "
            //             src={singleReq?.image}
            //             alt="photo"
            //           />
            //         </div>
            //         <div className="py-2">
            //           <h3 className="text-base ">3 Bed 3 Bath</h3>
            //           <h3 className="text-base w-[80%]">
            //             3 Belair Dr, Binghamton, NY 13901
            //           </h3>
            //         </div>
            //       </div>
            //       <div className="h-[80px] w-full"></div>
            //     </Popover>
            //   }
            //   key={Math.random()}
            // >
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
                  src={singleReq?.image}
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
          ))}

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
