"use client";
import Image from "next/image";
import { useState } from "react";
import { availableUnits } from "../AvailableUnits/AvailableUnitsCardFakeData";
import SavedUnitsModal from "./SavedUnitModal";

const SavedUnitsCard = () => {
  const [units, setUnits] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {/* Available units card start */}
      <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {availableUnits.map((unit) => (
          <div
            onClick={() => {
              setModalOpen(true);
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
      {/* modal */}
      <SavedUnitsModal
        open={modalOpen}
        setOpen={setModalOpen}
        availableUnits={availableUnits}
        units={units}
      />
      {/* Available units card end */}
    </div>
  );
};

export default SavedUnitsCard;
