"use client";
import Image from "next/image";
import React, { useState } from "react";
import AvailableUnitsModal from "../AvailableUnits/AvailableUnitsModal";
import { availableUnits } from "../AvailableUnits/AvailableUnitsCardFakeData";

const SavedUnitsCard = () => {
  const [units, setUnits] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  console.log("units", units);
  console.log("modalOpen", modalOpen);

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
              <div>
                <div className="py-2 px-5 rounded-full border-2 border-red-700">
                  <p className="text-sm text-center">9</p>
                  <hr />
                  <p className="text-sm text-center">10</p>
                </div>
              </div>
            </div>
            <AvailableUnitsModal
              open={modalOpen}
              setOpen={setModalOpen}
              availableUnits={availableUnits}
              units={units}
            />
          </div>
        ))}
      </div>
      {/* Available units card end */}
    </div>
  );
};

export default SavedUnitsCard;
