"use client";
import Image from "next/image";
import { useState } from "react";
import { availableUnits } from "../AvailableUnits/AvailableUnitsCardFakeData";
import SavedUnitsModal from "./SavedUnitModal";
import { fileUrlKey } from "@/configs/envConfig";
// import { Modal, Progress, Image } from "rsuite";

const SavedUnitsCard = ({ unitInfo, handleOpen }) => {

  return (
    <div>
      {/* Available units card start */}


      <div
        onClick={() => {
          handleOpen(unitInfo)
        }}
        key={Math.random()}
        className="border border-gray-700 hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer"
      >
        <Image
          height={80}
          width={80}
          className=" !w-[80px]  !h-[80px] object-cover     rounded-full  "
          // src={unitInfo?.images[0]}
          src={unitInfo?.images?.length > 0 ? `${fileUrlKey()}/${unitInfo?.images[0]}` : profileLogo}

          alt="saved unit" />
        <div className="flex justify-between items-start mt-2 px-2.5 py-1">
          <div>
            <h2 className="text-sm">$ {unitInfo.monthlyRent}</h2>
            <h2 className="text-sm">
              <span>{unitInfo.numOfBed}</span> <span>{unitInfo.numOfBath}</span>
            </h2>
            <h2 className="text-sm">{unitInfo.address}</h2>
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
      {/* modal */}
      {/* <SavedUnitsModal open={modalOpen} setOpen={setModalOpen} availableUnits={availableUnits} units={units} /> */}
      {/* Available units card end */}
    </div>
  );
};

export default SavedUnitsCard;
