"use client";
import Image from "next/image";
import { useState } from "react";
import SavedUnitsModal from "./SavedUnitModal";
import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";
import { Loader } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";

const SavedUnitsCard = () => {
  const [units, setUnits] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const query = {};

  query["itemType"] = "PROPERTY";

  const { data: availableUnits, isLoading } = useGetAllSavedItemsQuery({ ...query });

  return (
    <div className="mt-3">
      {/* if is loading */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader size="md" content="Getting Saved Units..." />
        </div>
      )}
      {/* if not found any units */}
      {!isLoading && !availableUnits?.data?.data?.length && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <h3 className="text-lg ">No Saved Unit Found... </h3>
        </div>
      )}

      {/* Available units card start */}
      <div className="mt-2 grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:gap-2 xl:gap-6 max-lg:mx-1.5">
        {!isLoading &&
          availableUnits?.data?.data?.length > 0 &&
          availableUnits?.data?.data?.map((unit) => (
            <div
              onClick={() => {
                setModalOpen(true);
                setUnits(unit);
              }}
              key={Math.random()}
              className="border border-gray-700 hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer"
            >
              <Image
                width={500}
                height={500}
                className="h-[200px] object-cover"
                src={`${fileUrlKey()}/${unit?.property?.images[0]}`}
                alt="Tenant available units"
              />
              <div className="flex  justify-between items-start mt-2 px-2.5 py-1">
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
      <SavedUnitsModal open={modalOpen} setOpen={setModalOpen} availableUnits={availableUnits} units={units} />
      {/* Available units card end */}
    </div>
  );
};

export default SavedUnitsCard;
