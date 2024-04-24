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

  return (
    <div className="space-y-3">
      <div className=" flex border   bg-white items-center justify-between px-5 py-7 rounded-2xl">
        <div className="flex gap-3 items-center">
          <h2 className="text-4xl font-semibold">{data?.data?.numOfRentedUnit || 0}</h2>
          <p className="text-xl font-medium">Rented Unit</p>
        </div>

        <div className=" outline outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[50px] h-[50px]">
          <div className=" flex w-full flex-col justify-center items-center">
            <span>1</span>
            <span className="w-[70%] border-t border-[#b6b6b6]" />
            <span>1</span>
          </div>
        </div>
      </div>
      <div className="space-y-5  border bg-white  px-5 py-3   rounded-2xl">
        <h2 className="text-2xl font-semibold">${data?.data?.collectedRentOfCurrentMonth || 0.0}</h2>
        <p className="text-xl font-medium">Rented Collected this month</p>
      </div>
      <div className="border flex justify-between items-start    px-5 py-3  rounded-2xl bg-white">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold">${data?.data?.costOfCurretntMonth || 0.0}</h2>
          <p className="text-xl font-medium">Cost this month</p>
        </div>
      </div>
      <div className="border flex justify-between items-center py-3 px-5 rounded-2xl bg-white">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold">${data?.data?.extraCost?.cost || 0.0}</h2>
          <p className="text-xl font-medium">Extra Cost</p>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpenModal(true);
              setModalData(data?.data?.extraCost);
            }}
            className="bg-transparent focus-within:border-none focus-within:outline-none focus-within:ring-0 hover:bg-slate-200 duration-300 p-3 rounded-full"
          >
            <FaPencilAlt size={20} />
          </button>
        </div>
      </div>
      {/*  update modal*/}
      <UpdateExtraCostModal modalData={modalData} open={isOpenModal} handleClose={handleClose} />
    </div>
  );
};

export default DashboardInfo;
