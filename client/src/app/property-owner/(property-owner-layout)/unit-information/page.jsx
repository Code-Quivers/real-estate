import apartmentPhoto from "@/assets/propertyOwner/apartment.jpg";
import Image from "next/image";

import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { IconButton } from "rsuite";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import Link from "next/link";

const PropertyOwnerUnitInformation = () => {
  return (
    <section className=" lg:max-w-[1050px]   max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-10 2xl:mx-auto lg:px-5    2xl:px-0 ">
      <div className="flex justify-center">
        <h2 className="text-3xl  ">Unit Information</h2>
      </div>
      {/* main section */}
      <div className="w-full lg:border  md:p-3 lg:p-8 mt-5 space-y-8 border-[#707070]">
        {/* top section */}
        <div className="grid grid-cols-12 items-end gap-5">
          <div className="col-span-12 md:col-span-12 lg:col-span-5  border border-[#707070]">
            <Image
              src={apartmentPhoto}
              className="object-cover lg:h-[220px] object-center"
              alt=""
            />
          </div>
          <div className="col-span-12 lg:col-span-7   justify-between  ">
            <div className="space-y-3   max-lg:w-full ">
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

              <div className="border border-[#707070] flex gap-3 items-center w-full   lg:w-[400px]">
                <Image
                  className="w-[80px] h-[80px] object-cover     "
                  src={profileLogo}
                  alt="photo"
                />
                <h3>Tenant Name</h3>
              </div>
            </div>
          </div>
        </div>
        {/* other */}
        <div className="grid grid-cols-12 items-end gap-5">
          <div className="col-span-12 lg:col-span-5 ">
            <Link
              className="h-[180px] flex justify-center flex-col items-center  border border-[#707070] hover:bg-[#707070]
              hover:text-white group"
              href="/property-owner/unit-information/add-property"
            >
              <span className="border border-[#707070] group-hover:border-white rounded-full p-3">
                <FaPlus size={40} />
              </span>
              <p>Add New House</p>
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-5 flex justify-between  ">
            <div className="space-y-3 w-full">
              <div className=" ">
                <Link
                  className="h-[60px] flex gap-5 px-2  items-center  border border-[#707070] hover:bg-[#707070]
              hover:text-white group"
                  href="/property-owner/available-tenants"
                >
                  <span className="border border-[#707070] group-hover:border-white rounded-full p-2">
                    <FaPlus size={25} />
                  </span>
                  <p className="font-medium">Add New Tenant Name</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* service provider */}
        <div>
          <div className="flex justify-center mt-10 mb-5">
            <h2 className="font-medium text-lg">
              Service Providers for your unit
            </h2>
          </div>
          <div className="grid grid-cols-12 items-end gap-5">
            <div className=" col-span-12 lg:col-span-5 h-[260px] flex justify-center flex-col items-center  border border-[#707070]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerUnitInformation;
