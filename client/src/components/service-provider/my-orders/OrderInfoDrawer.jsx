"use client";
import Image from "next/image";
import { Drawer, IconButton, useMediaQuery } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";
import { CgClose } from "react-icons/cg";
import { getType } from "@/constants/tableValues";
import SingleReqDrawerSwiper from "@/components/tenant/request/SingleReqDrawerSwiper";
import SendMessagePopOverFromServiceProvider from "../messaging/SendMessagePopOverFromServiceProvider";
import UpdateMyOrderStatusModal from "./UpdateMyOrderStatusModal";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

const OrderInfoDrawer = ({ open, setOpen, requestToDrawer }) => {
  const [isMobile] = useMediaQuery(["(max-width: 700px)"]);
  const handleClose = () => setOpen(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleCloseUpdate = () => setIsOpenEdit(false);
  return (
    <div>
      <Drawer
        closeButton={
          <div className="flex items-center gap-3 px-3 py-0.5">
            <IconButton
              onClick={handleClose}
              className="group"
              circle
              appearance="subtle"
              icon={<CgClose className="group-hover:scale-125 group-hover:text-red-600 duration-300 transition-all" size={22} />}
            />
            {/* <h3>Unit Information Of : {unitInfo?.title}</h3> */}
          </div>
        }
        overflow={false}
        size={isMobile ? "full" : "lg"}
        placement={isMobile ? "bottom" : "right"}
        open={open}
        onClose={handleClose}
      >
        <Drawer.Body
          className="custom-scrollbar"
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <div>
            <div className="md:grid md:grid-cols-12 justify-between items-stretch">
              <SingleReqDrawerSwiper requestImages={requestToDrawer?.images} />
              <div className="max-md:hidden md:col-span-5 w-full  overflow-y-scroll lg:max-h-[92vh] 2xl:max-h-[95vh]  3xl:max-h-[95vh] custom-scrollbar">
                {requestToDrawer?.images?.length
                  ? requestToDrawer?.images?.map((photo) => (
                      <div key={Math.random()} className="flex flex-col">
                        <div className=" ">
                          <Image
                            className="h-[200px]  border-b w-full object-cover mb-1"
                            height={300}
                            width={300}
                            src={`${fileUrlKey()}/${photo}`}
                            alt="Unit Photo"
                          />
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <div className="md:col-span-7 w-full overflow-y-scroll lg:max-h-[92vh] 2xl:max-h-[95vh]  3xl:max-h-[95vh] custom-scrollbar ">
                <hr className="max-md:hidden" />
                <div className="flex justify-between items-end py-3">
                  <div className="px-4 space-y-2 ">
                    <h2 className="font-medium">Issue Type: {requestToDrawer?.issueType}</h2>
                    <h2 className="">issue Location: {requestToDrawer?.issueLocation}</h2>{" "}
                    <h3 className="font-medium">Priority: {getType(requestToDrawer?.priority)}</h3>
                  </div>
                  <div className=" px-4 flex flex-col gap-y-4 justify-between items-center  ">
                    <div>
                      <button
                        onClick={() => {
                          setIsOpenEdit(true);
                        }}
                        className="bg-primary text-sm flex items-center gap-2 text-white px-3 py-1 rounded-full"
                      >
                        <MdModeEditOutline size={18} />
                        Edit
                      </button>
                    </div>
                    <div>
                      <span
                        className={`${
                          requestToDrawer?.status === "PENDING"
                            ? "bg-yellow-100 border-yellow-600 text-yellow-600"
                            : requestToDrawer?.status === "ACTIVE"
                              ? "bg-blue-100 text-blue-600 border-blue-600"
                              : requestToDrawer?.status === "COMPLETED"
                                ? "bg-green-100 text-green-600 border-green-600"
                                : requestToDrawer?.status === "CANCEL"
                                  ? "bg-red-100 text-red-600 border-red-600"
                                  : requestToDrawer?.status === "PAUSED"
                                    ? "bg-gray-100 text-gray-600 border-gray-600"
                                    : ""
                        } px-2.5  py-0.5 font-medium text-xs border rounded-full `}
                      >
                        {requestToDrawer?.status}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-2" />
                {/* */}
                <div className="">
                  {/* owner info and contact */}
                  <div className="px-4 my-3 flex justify-between items-center">
                    <div>
                      <p className="text-gray-900 font-semibold">Owner</p>
                      <p>
                        {requestToDrawer?.owner?.firstName} {requestToDrawer?.owner?.lastName}
                      </p>
                    </div>
                    <SendMessagePopOverFromServiceProvider receiverId={requestToDrawer?.owner?.userId} />
                  </div>
                  <hr className="my-2" />
                  {/* Tenant Info */}
                  <div className="px-4 my-3 flex justify-between items-center">
                    <div>
                      <p className="text-gray-900 font-semibold">Tenant</p>
                      <p>
                        {requestToDrawer?.tenant?.firstName} {requestToDrawer?.tenant?.lastName}
                      </p>
                    </div>
                    <SendMessagePopOverFromServiceProvider receiverId={requestToDrawer?.tenant?.userId} />
                  </div>
                </div>
                <hr className="my-2" />

                {/*  description*/}
                <div className="px-4">
                  <div className="my-3">
                    <h1 className="font-semibold">Description</h1>
                    <p>{requestToDrawer?.description || "N/A"}</p>
                  </div>
                  <hr className="my-2" />

                  <div className="my-3">
                    <h1 className="font-semibold">Animals</h1>
                    <p>{requestToDrawer?.animalDetails || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      {/*  */}
      <UpdateMyOrderStatusModal handleClose={handleCloseUpdate} editData={requestToDrawer} isOpen={isOpenEdit} handleCloseDrawer={handleClose} />
    </div>
  );
};

export default OrderInfoDrawer;
