"use client";
import Image from "next/image";
import { useState } from "react";
import SavedUnitsModal from "./SavedUnitModal";
import houseLogo from "@/assets/house/house-logo.jpg";
import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";
import { Loader } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";
import Score from "@/components/Shared/Score/Score";

const SavedUnitsCard = () => {
  const [isOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const handleClose = () => setModalOpen(false);
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

      <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 max-md:mx-1">
        {!isLoading &&
          availableUnits?.data?.data?.length > 0 &&
          availableUnits?.data?.data?.map((unit) => (
            <div
              onClick={() => {
                setModalOpen(true);
                setModalData(unit);
              }}
              key={Math.random()}
              className="border  rounded-lg hover:shadow-lg shadow-md hover:border transition-all duration-500 ease-in-out cursor-pointer"
            >
              <Image
                width={300}
                height={300}
                className="w-full h-[200px]  object-cover rounded-t-lg  "
                src={unit?.property?.images?.length ? `${fileUrlKey()}/${unit?.property?.images[0]}` : houseLogo}
                alt="Unit Image"
              />
              <div className="flex w-full justify-between items-start px-3 py-4">
                <div>
                  <h2 className="text-sm lg:font-semibold">${unit?.property?.monthlyRent?.toLocaleString()}</h2>
                  <h2 className="text-sm">
                    <span>{unit?.property?.numOfBed ? unit?.property?.numOfBed : "0"} Bed </span>
                    <span>{unit?.property?.numOfBath ? unit?.property?.numOfBath : "0"} Bath</span>
                  </h2>
                  <h2 className="text-sm">{unit?.property?.address ? unit?.property?.address : "--"}</h2>
                </div>
                <div>
                  <Score score={unit?.property?.scoreRatio?.score} total={unit?.property?.scoreRatio?.total} />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* modal */}
      <SavedUnitsModal open={isOpen} handleClose={handleClose} units={modalData} />
    </div>
  );
};

export default SavedUnitsCard;
