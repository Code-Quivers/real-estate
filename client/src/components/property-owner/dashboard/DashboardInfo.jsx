/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useGetDashboardInfoQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import UpdateExtraCostModal from "./UpdateExtraCostModal";

const DashboardInfo = () => {
  const { data, isLoading, isError } = useGetDashboardInfoQuery(
    {},
    {
      pollingInterval: 100000,
    },
  );
  // update
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const handleClose = () => setIsOpenModal(false);
  console.log("shafin", data?.data);
  return (
    <div className="grid md:grid-cols-12 gap-4">
      <div className="flex border col-span-6 bg-white items-center justify-between px-5 py-7 rounded-2xl">
        <div className="">
          <p className="text-xl font-medium">Rented Unit</p>
          <h2 className="text-4xl font-semibold">{data?.data?.numOfRentedUnit || 0}</h2>
        </div>
        <div className=" outline outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[50px] h-[50px]">
          <div className=" flex w-full flex-col justify-center items-center">
            <span>{data?.data?.rentedUnitScoreRatio}</span>
            <span className="w-[70%] border-t border-[#b6b6b6]" />
            <span>{data?.data?.myTotalUnits || 0}</span>
          </div>
        </div>
      </div>
      <div className="space-y-5 col-span-6 border bg-white  px-5 py-3   rounded-2xl">
        <p className="text-xl font-medium">Rented Collected this month</p>
        <h2 className="text-2xl font-semibold">${data?.data?.collectedRentOfCurrentMonth || 0.0}</h2>
      </div>
      <div className="border flex col-span-6 justify-between items-start    px-5 py-3  rounded-2xl bg-white">
        <div className="space-y-5">
          <p className="text-xl font-medium">Cost this month</p>
          <h2 className="text-2xl font-semibold">${data?.data?.costOfCurrentMonth || 0.0}</h2>
        </div>
      </div>
      <div className="border flex col-span-6 justify-between  py-3 px-5 rounded-2xl bg-white">
        <div className="space-y-5">
          <p className="text-xl font-medium">Extra Cost</p>
          <h2 className="text-2xl font-semibold">${data?.data?.extraCost?.cost || 0.0}</h2>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpenModal(true);
              setModalData(data?.data?.extraCost);
            }}
            className="bg-transparent focus-within:border-none focus-within:outline-none focus-within:ring-0 hover:bg-slate-200 duration-300 p-3 rounded-full"
          >
            <FaPencilAlt size={16} />
          </button>
        </div>
      </div>
      {/*  update modal*/}
      <UpdateExtraCostModal modalData={modalData} open={isOpenModal} handleClose={handleClose} />
    </div>
  );
};

export default DashboardInfo;
