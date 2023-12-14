"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Modal, Button, Placeholder } from "rsuite";

import { SelectPicker } from "rsuite";
import Image from "next/image";
import { availableUnits } from "./AvailableUnitsCardFakeData";
import AvailableUnitsModal from "./AvailableUnitsModal";

// Search Location data
const data = [
  "Newest",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

// Price data
const pricePicker = {
  width: 224,
  display: "block",
  marginBottom: 10,
};

// sorting data
const datas = ["Newest", "Oldest"].map((item) => ({
  label: item,
  value: item,
}));

const AvailableUnitsCard = () => {
  const [units, setUnits] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0 mx-auto">
      {/* search with price section start */}
      <div className="flex justify-start items-start gap-5 border-r-0 border-gray-800">
        <div>
          <SelectPicker
            size="lg"
            placeholder="Search location"
            data={data}
            style={pricePicker}
          />
        </div>
        <div>
          <SelectPicker
            size="lg"
            placeholder="Price"
            data={data}
            style={pricePicker}
          />
        </div>
        <div>
          <SelectPicker
            size="lg"
            placeholder="More"
            data={data}
            style={pricePicker}
          />
        </div>
      </div>
      {/* search with price section end */}

      {/* sort area start */}
      <div className="text-end">
        <SelectPicker
          color="blue"
          label="Sort"
          data={datas}
          style={{ width: 224 }}
        />
      </div>
      {/* sort area end */}

      {/* Available units card start */}
      <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {availableUnits.map((unit) => (
          <div
            onClick={() => {
              setOpen(true);
              setUnits(unit);
            }}
            key={Math.random()}
            className="border border-gray-700 hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer"
          >
            <Image
              width="full"
              objectFit="cover"
              src={unit.image}
              alt="Tenant avialable units"
            />
            <div className="flex justify-between items-start mt-2 px-2.5 py-1">
              <div>
                <h2 className="text-sm">{unit.price}</h2>
                <h2 className="text-sm">
                  <span>{unit.bed}</span> <span>{unit.bath}</span>
                </h2>
                <h2 className="text-sm">{unit.address}</h2>
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
      {/* Available units card end */}
      {/* Available units details using popup start */}
      <AvailableUnitsModal
        open={open}
        setOpen={setOpen}
        availableUnits={availableUnits}
        units={units}
      />
      {/* Available units details using popup end */}
    </div>
  );
};

export default AvailableUnitsCard;
