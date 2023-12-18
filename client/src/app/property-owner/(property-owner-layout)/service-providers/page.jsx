"use client";
import { FaSearch } from "react-icons/fa";
import { Popover, SelectPicker, Whisper } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";
import MaintenanceServiceProviderModal from "../../../../components/property-owner/maintenance-request/MaintenanceServiceProviderModal";

const PropertyOwnerServiceProviders = () => {
  const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));
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

  //
  const [serviceModalActive, setServiceModalActive] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-4xl ">Service Providers</h2>
      </div>
      {/* search with price section start */}
      <div className="grid grid-cols-5 max-lg:gap-2 lg:flex w-full border  mt-5 lg:mt-10   ">
        <div className="max-lg:col-span-3">
          <InputGroup
            size="lg"
            inside
            className="lg:!w-[400px]"
            style={{ borderRadius: "0 !important" }}
          >
            <AutoComplete
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
            placeholder="Service Type"
            data={data}
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
            placement="bottomEnd"
            placeholder="Priority Type"
            data={data}
            style={{
              borderRadius: "0px !important",
              width: "200px !important",
            }}
          />
        </div>
      </div>

      {/* all cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {allRequest?.map((singleReq) => (
          <Whisper
            placement="top"
            trigger="hover"
            controlId="control-id-hover"
            speaker={
              <Popover>
                <div className="flex gap-2 border rounded-2xl overflow-hidden shadow items-stretch">
                  <div>
                    <Image
                      className="w-[100px] bg-red-800 h-full object-cover     "
                      src={singleReq?.image}
                      alt="photo"
                    />
                  </div>
                  <div className="py-2">
                    <h3 className="text-base ">${singleReq?.servicePrice}</h3>
                    <h3 className="text-base ">3 Bed 3 Bath</h3>
                    <h3 className="text-base w-[80%]">
                      3 Belair Dr, Binghamton, NY 13901
                    </h3>
                  </div>
                </div>
                <div className="h-[80px] w-full"></div>
              </Popover>
            }
            key={Math.random()}
          >
            <div
              onClick={() => {
                setSelectedService(singleReq);
                setServiceModalActive(true);
              }}
              className=" col-span-1  border flex justify-between items-center px-5 border-[#acacac]  gap-2"
            >
              <div>
                <Image
                  className="w-[80px] h-[65px] object-cover   rounded-full  "
                  src={singleReq?.image}
                  alt="photo"
                />
              </div>
              <div className="p-5 flex justify-between w-full ">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">
                    {singleReq?.serviceProviderName}
                  </h3>
                  <h3 className="text-base font-medium">
                    {singleReq?.serviceType}
                  </h3>
                  <h3 className="text-base font-medium">
                    Service Price : ${singleReq?.servicePrice}
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
          </Whisper>
        ))}

        <>
          <MaintenanceServiceProviderModal
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
