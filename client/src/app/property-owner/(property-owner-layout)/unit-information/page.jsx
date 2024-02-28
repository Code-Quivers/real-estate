"use client";
import apartmentPhoto from "@/assets/propertyOwner/apartment.jpg";
import Image from "next/image";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { IconButton } from "rsuite";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";

const PropertyOwnerUnitInformation = () => {
  const { data, isLoading, isSuccess, isError } = useGetMyAllUnitsQuery();
  console.log(data);

  return (
    <section className=" lg:max-w-[1050px]   max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-10 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl  ">
          Unit Information | Total {data?.meta?.total}
        </h2>
        <Link
          href="/property-owner/unit-information/add-property"
          className=" bg-primary text-white px-3 flex items-center gap-2 py-2 drop-shadow-lg"
        >
          <FaPlus /> Add New Unit / House
        </Link>
      </div>
      {/* main section */}
      <div>
        {data?.data?.map((singleProperty, idx) => (
          <div key={Math.random()} className="mt-5">
            <h2 className="text-base font-bold mb-4 ">Property {idx + 1}</h2>
            <div className="w-full lg:border  md:p-3 lg:p-8 mt-5 border-[#707070] space-y-8 ">
              {/* top section */}
              <div className="grid grid-cols-12 items-end gap-5">
                <div className="col-span-12  md:col-span-12 lg:col-span-6  border border-[#707070]">
                  <Image
                    src={apartmentPhoto}
                    className="object-cover object-center"
                    alt=""
                  />
                </div>
                {/* unit info */}
                <div className="col-span-12 lg:col-span-6   space-y-3  flex border justify-between border-black  p-5    w-full    ">
                  <div className="flex justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">$1200</h3>
                      <h3 className="text-lg font-medium">3 Beds 3 Baths</h3>
                      <h3 className="text-lg font-medium">
                        3 Belair Dr, Binghamton, NY 13901
                      </h3>
                    </div>
                    <div>
                      <IconButton
                        icon={<FaPencilAlt size={30} color="#030303" />}
                        appearance="subtle"
                        circle
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* tenant and service provider */}
              <div className=" ">
                <div className="grid grid-cols-12 lg:grid-cols-10  items-end gap-5">
                  <div className=" col-span-12 border border-[#707070] min-h-[200px] p-5 lg:col-span-5 ">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Tenant Information
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button>Add</button>
                        <button>Update</button>
                      </div>
                    </div>
                  </div>
                  <div className=" col-span-12 border border-[#707070] min-h-[200px] p-5 lg:col-span-5 ">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Service Provider Information
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Link
                          href="/"
                          className=" border border-transparent bg-primary text-white px-2 py-1"
                        >
                          Add
                        </Link>
                        <Link
                          href="/"
                          className="  border border-primary hover:border-primary/80 hover:text-white hover:bg-primary/80 text-primary px-2 py-1"
                        >
                          Update
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* <div className=" col-span-12 lg:col-span-5 h-[260px] flex justify-center flex-col items-center  border border-[#707070]">
                  <span className="border border-[#707070] rounded-full p-3.5">
                    <FaPlus color="#333333" size={40} />
                  </span>
                  <p className="mt-3">Service Provider Name</p>
                  <p className="mt-3">Service Type</p>
                  <p className="mt-3">Service Price</p>
                  <p className="mt-3">Priority Type</p>
                </div>
                <div className="col-span-12 lg:col-span-5 lg:w-[400px] h-[180px] flex justify-center flex-col items-center  border border-[#707070]">
                  <span className="border border-[#707070] rounded-full p-3.5">
                    <FaPlus color="#333333" size={40} />
                  </span>
                  <p className="mt-3">Add New Service Provider</p>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyOwnerUnitInformation;
