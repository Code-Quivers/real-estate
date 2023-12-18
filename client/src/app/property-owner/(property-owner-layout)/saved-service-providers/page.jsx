"use client";
import { Popover, Whisper } from "rsuite";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import { useState } from "react";
import MaintenanceServiceProviderModal from "../../../../components/property-owner/maintenance-request/MaintenanceServiceProviderModal";

const PropertyOwnerServiceProviders = () => {
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
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-5 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-3xl ">SavedService Providers</h2>
      </div>

      {/* all cards */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {allRequest?.map((singleReq) => (
          <Whisper
            placement="bottom"
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
              className=" col-span-1  shadow-lg border flex justify-between items-center px-5 border-[#acacac]  gap-2"
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
