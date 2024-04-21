"use client";
/* eslint-disable react/no-unescaped-entities */
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { Input, InputGroup, SelectPicker } from "rsuite";
import Image from "next/image";
import { availableUnits } from "./AvailableUnitsCardFakeData";
import AvailableUnitsModal from "./AvailableUnitsModal";
import { FiSearch } from "react-icons/fi";
import { useGetAllAvailableUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import { fileUrlKey } from "@/configs/envConfig";
import { useState } from "react";
import { sortingPicker } from "@/constants/selectPicker.const";
import { Loader } from "rsuite";

// Search Location data
const data = ["Newest", "Linda", "Nancy", "Lloyd", "Alice", "Julia", "Albert"].map((item) => ({ label: item, value: item }));

// Price data

const AvailableUnitsCard = () => {
  const [units, setUnits] = useState(null);
  const [open, setOpen] = useState(false);
  const query = {};
  // const [page, setPage] = useState(1);
  // const [size, setSize] = useState(20);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //
  query["searchTerm"] = searchTerm;
  query["sortOrder"] = sortOrder;
  query["sortBy"] = sortBy;
  query["limit"] = 20;

  const { data: allAvailableUnitsRes, isLoading, isError } = useGetAllAvailableUnitsQuery({ ...query });
  return (
    <section className="max-w-[1050px]  mb-5 mt-5 2xl:mx-auto lg:px-5   px-3 2xl:px-0 ">
      {/* search with price section start */}
      <div className="grid grid-cols-2 lg:flex justify-start items-start  lg:gap-5 border-r-0 border-gray-800">
        <div className="w-full">
          <InputGroup size="lg" inside>
            <Input onChange={(e) => setSearchTerm(e)} placeholder="Search Location" size="lg" />
            <InputGroup.Button>
              <FiSearch />
            </InputGroup.Button>
          </InputGroup>
        </div>
        <div className="w-full">
          <SelectPicker className="!w-full" size="lg" placeholder="Price" data={data} />
        </div>
        <div className="w-full">
          <SelectPicker size="lg" placeholder="More" data={data} className="!w-full" />
        </div>
      </div>
      {/* search with price section end */}

      {/* sort area start */}
      <div className="flex justify-end items-center mt-5">
        <div>
          <SelectPicker
            color="blue"
            label="Sort"
            onChange={(value) => setSortOrder(value)}
            searchable={false}
            data={sortingPicker}
            style={{ width: 150 }}
          />
        </div>
      </div>
      {/* sort area end */}

      {/* Available units card start */}

      <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {!isLoading &&
          !isError &&
          allAvailableUnitsRes?.data?.map((unit) => (
            <div
              onClick={() => {
                setOpen(true);
                setUnits(unit);
              }}
              key={Math.random()}
              className="border border-gray-700 hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer"
            >
              <Image
                width={300}
                height={300}
                className="w-full h-[250px] object-center object-cover"
                src={unit?.images?.length ? `${fileUrlKey()}/${unit?.images[0]}` : profileLogo}
                alt="Tenant available units"
              />
              <div className="flex w-full justify-between items-start mt-2 px-2.5 py-1">
                <div>
                  <h2 className="text-sm">$1200</h2>
                  <h2 className="text-sm">
                    <span>{unit?.numOfBed ?? "0"} Bed </span>
                    <span>{unit?.numOfBath ?? "0"} Bath</span>
                  </h2>
                  <h2 className="text-sm">{unit?.address ? unit?.address : "--"}</h2>
                </div>
                {/* <div>
                <div className="py-2 px-5 rounded-full border-2 border-red-700">
                  <p className="text-sm text-center">9</p>
                  <hr />
                  <p className="text-sm text-center">10</p>
                </div>
              </div> */}
                <div className=" outline outline-4 md:outline-6 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  px-4">
                  <div className=" flex w-full flex-col justify-center items-center">
                    <span className="font-medium">9</span>
                    <span className="w-[70%] border-t border-[#b6b6b6]" />
                    <span className="font-medium">10</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!isLoading && !allAvailableUnitsRes?.data?.length && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <h3 className="text-2xl">No Available Units Found !!</h3>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader size="md" content="Loading..." />
        </div>
      )}

      {/* Available units card end */}
      {/* Available units details using popup start */}
      <AvailableUnitsModal open={open} setOpen={setOpen} availableUnits={availableUnits} unitInfo={units} />
      {/* Available units details using popup end */}
    </section>
  );
};

export default AvailableUnitsCard;
