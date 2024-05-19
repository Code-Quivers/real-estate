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
import { pricePicker, sortingPicker } from "@/constants/selectPicker.const";
import { Loader } from "rsuite";
import Score from "@/components/Shared/Score/Score";
import UnitCardSkeleton from "@/components/loading-skeleton/UnitCardSkeleton";

const AvailableUnitsCard = () => {
  const [units, setUnits] = useState(null);
  const [open, setOpen] = useState(false);
  const query = {};

  // eslint-disable-next-line no-unused-vars
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
    <section className="max-w-6xl mb-5 mt-5 mx-auto lg:px-5 px-3 min-h-screen">
      {/* search with price section start */}
      <div className="grid grid-cols-5 lg:grid-cols-3  items-start  gap-3 lg:gap-5 border-r-0 border-gray-800">
        <div className="w-full  col-span-3 lg:col-span-2">
          <InputGroup size="lg" inside>
            <Input onChange={(e) => setSearchTerm(e)} placeholder="Search Location" size="lg" />
            <InputGroup.Button>
              <FiSearch />
            </InputGroup.Button>
          </InputGroup>
        </div>
        <div className="w-full col-span-2 lg:col-span-1">
          <SelectPicker
            searchable={false}
            size="lg"
            placeholder="Price"
            data={pricePicker}
            onChange={(e) => {
              setSortBy("monthlyRent");
              setSortOrder(e);
            }}
            onClean={() => {
              setSortBy("createdAt");
              setSortOrder("");
            }}
            className="!w-full"
          />
        </div>
      </div>
      {/* search with price section end */}
      {/* Sorting */}
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
      {isLoading && (
        <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <UnitCardSkeleton />
          <UnitCardSkeleton />
          <UnitCardSkeleton />
        </div>
      )}

      <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {!isLoading &&
          !isError &&
          allAvailableUnitsRes?.data?.map((unit) => (
            <div
              onClick={() => {
                setOpen(true);
                setUnits(unit);
              }}
              key={Math.random()}
              className="border rounded-lg hover:shadow-lg shadow-md hover:border transition-all duration-500 ease-in-out cursor-pointer"
            >
              <Image
                width={300}
                height={300}
                className="w-full h-[200px] object-center object-cover rounded-t-lg  "
                src={unit?.images?.length ? `${fileUrlKey()}/${unit?.images[0]}` : profileLogo}
                alt="Unit Image"
              />
              <div className="flex w-full justify-between items-start px-3 py-4">
                <div>
                  <h2 className="text-sm font-semibold">${unit?.monthlyRent?.toLocaleString()}</h2>
                  <h2 className="text-sm">
                    <span>{unit?.numOfBed ?? "0"} Bed </span> | <span>{unit?.numOfBath ?? "0"} Bath</span>
                  </h2>
                  <h2 className="text-sm">{unit?.address ? unit?.address : "--"}</h2>
                </div>
                <div>
                  <Score score={unit?.scoreRatio?.score} total={unit?.scoreRatio?.total} />
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

      {/* Available units details using popup start */}
      <div className="max-md:hidden">
        <AvailableUnitsModal open={open} setOpen={setOpen} availableUnits={availableUnits} unitInfo={units} />
      </div>
      {/* Available units details using popup end */}
    </section>
  );
};

export default AvailableUnitsCard;
