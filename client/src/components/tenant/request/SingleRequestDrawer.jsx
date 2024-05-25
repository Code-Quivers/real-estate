"use client";
import Image from "next/image";
import { Drawer, IconButton, useMediaQuery } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";
import { CgClose } from "react-icons/cg";
import { getType } from "@/constants/tableValues";
import SendMessagePopOverFromTenant from "@/components/Shared/modal/SendMessagePopOverFromTenant";
import SingleReqDrawerSwiper from "./SingleReqDrawerSwiper";
// import AvailableUnitsModalSwiper from "./swiper/AvailableUnitsModalSwiper";

const SingleRequestDrawer = ({ open, setOpen, requestToDrawer }) => {
  const [isMobile] = useMediaQuery(["(max-width: 700px)"]);
  const handleClose = () => setOpen(false);

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
                <div className="px-4 pt-1 pb-2 ">
                  <div>
                    <h2 className="mb-1.5 font-medium">Issue Type: {requestToDrawer?.issueType}</h2>
                    <h2 className="">issue Location: {requestToDrawer?.issueLocation}</h2>
                  </div>
                </div>
                <div className="flex px-4 justify-between items-center">
                  <p>Priority: {getType(requestToDrawer?.priority)}</p>
                  <span
                    className={`${requestToDrawer?.status === "PENDING" ? "bg-yellow-100  border-yellow-500 text-yellow-600" : requestToDrawer?.status == "APPROVED" ? "bg-blue-100 text-blue-600 border-blue-500" : ""} px-2.5 font-medium text-sm border rounded-full `}
                  >
                    {requestToDrawer?.status}
                  </span>
                </div>
                <hr className="my-2" />
                {/* */}
                <div>
                  {/* owner info and contact */}
                  <div className="px-4 flex justify-between">
                    <div>
                      <p className="text-gray-900">Owner</p>
                      <p>
                        {requestToDrawer?.owner?.firstName} {requestToDrawer?.owner?.lastName}
                      </p>
                    </div>
                    <SendMessagePopOverFromTenant receiverId={requestToDrawer?.owner?.userId} />
                  </div>
                </div>
                <hr className="my-2" />

                {/*  description*/}
                <div className="px-4">
                  <h1 className="font-semibold">Description</h1>
                  <p>{requestToDrawer?.description || "N/A"}</p>
                  <div className="mt-1">
                    <h1 className="font-semibold">Animals</h1>
                    <p>{requestToDrawer?.animalDetails || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default SingleRequestDrawer;
