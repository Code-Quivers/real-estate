"use client";
import { FaSearch } from "react-icons/fa";
import { SelectPicker } from "rsuite";
import { AutoComplete, InputGroup } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";

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
  const styles = {
    width: "400px",
    borderRadius: "0 !important",
  };
  const allRequest = [
    {
      tenantName: "Tenant name",
      placeToRent: "Place to rend",
      rentWillingToPay: "Rent willing to pay",
      image: profileLogo,
    },
    {
      tenantName: "Tenant name",
      placeToRent: "Place to rend",
      rentWillingToPay: "Rent willing to pay",
      image: profileLogo,
    },
    {
      tenantName: "Tenant name",
      placeToRent: "Place to rend",
      rentWillingToPay: "Rent willing to pay",
      image: profileLogo,
    },
  ];
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
          <div
            className=" col-span-1  border flex justify-between items-center px-5 border-[#acacac]  gap-2"
            key={Math.random()}
          >
            <div>
              <Image
                className="w-[80px] h-[65px] object-cover object-left  rounded-full  "
                src={singleReq.image}
                alt="photo"
              />
            </div>
            <div className="p-5 flex justify-between w-full ">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">
                  {singleReq.tenantName}
                </h3>
                <h3 className="text-base font-medium">
                  {singleReq.placeToRent}
                </h3>
                <h3 className="text-base font-medium">
                  {singleReq.rentWillingToPay}
                </h3>
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
        ))}
      </div>
    </section>
  );
};

export default PropertyOwnerServiceProviders;
