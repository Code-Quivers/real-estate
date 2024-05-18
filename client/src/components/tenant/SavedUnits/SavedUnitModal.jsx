"use client";
import Score from "@/components/Shared/Score/Score";
import SendMessagePopOverFromTenant from "@/components/Shared/modal/SendMessagePopOverFromTenant";
import { fileUrlKey } from "@/configs/envConfig";
import { useRemoveFromSavedItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Button, Carousel, Drawer, IconButton, Notification, useMediaQuery, useToaster } from "rsuite";

const SavedUnitsModal = ({ open, handleClose, units: item }) => {
  const [isMobile] = useMediaQuery(["(max-width: 700px)"]);
  const [openTab, setOpenTab] = useState(1);
  // ! save item
  const [removeFromSavedItem, { data, isLoading, isSuccess, isError, error, reset: resetReq }] = useRemoveFromSavedItemMutation();
  const handleRemoveUnit = async () => {
    await removeFromSavedItem({ itemId: item?.itemId });
  };

  // !
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{data?.message || "Unit Removed"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      handleClose();
      resetReq();
    }
    if (isError && !isSuccess && error && !isLoading) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message || "Failed to Remove"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isSuccess, isSuccess, error, isLoading, toaster]);

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
            <h3>Unit Information Of : {item?.property?.title}</h3>
          </div>
        }
        overflow={false}
        size={isMobile ? "full" : "lg"}
        placement={isMobile ? "bottom" : "right"}
        open={open}
        onClose={handleClose}
      >
        <Drawer.Body
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <div className="grid md:grid-cols-12    justify-between   items-stretch  ">
            {/* images */}
            <Carousel className="custom-slider max-h-[250px] md:col-span-5 md:hidden">
              <div className="md:col-span-5 md:hidden">
                <Carousel className="custom-slider max-h-[250px] ">
                  {item?.property?.images?.length > 0
                    ? item?.property?.images?.map((photo, index) => (
                        <div key={index}>
                          <Image className="w-full h-full object-cover" height={300} width={300} src={`${fileUrlKey()}/${photo}`} alt="Unit Photo" />
                        </div>
                      ))
                    : null}
                </Carousel>
              </div>
            </Carousel>
            <div className="max-md:hidden lg:col-span-5 w-full  overflow-y-scroll lg:max-h-[92vh] 2xl:max-h-[95vh]  3xl:max-h-[95vh] custom-scrollbar">
              {item?.property?.images?.length > 0 ? (
                item?.property?.images?.map((photo, index) => (
                  <div key={index} className="flex flex-col divide-y divide-[#8b8b8b]">
                    <div className="">
                      <Image
                        className="h-[200px] mb-1 w-full object-cover"
                        height={300}
                        width={300}
                        src={`${fileUrlKey()}/${photo}`}
                        alt="Unit Photo"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center min-h-[40vh]">
                  <h2>No Images Available</h2>
                </div>
              )}
            </div>

            {/* others */}
            <div className="lg:col-span-7 w-full overflow-y-scroll lg:max-h-[92vh] 2xl:max-h-[95vh]  3xl:max-h-[95vh] custom-scrollbar ">
              <div className="flex px-3 py-1.5  justify-between items-center  bg-white">
                <div>
                  {item?.property?.owner?.profileImage ? (
                    <Image
                      src={`${fileUrlKey()}/${item?.property?.owner?.profileImage}`}
                      width={70}
                      height={70}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    "Logo"
                  )}
                </div>
                <div className="flex gap-2.5 items-center">
                  <div>
                    <Button onClick={handleRemoveUnit} className="!bg-primary w-full !text-white !px-3.5 !py-1 !text-base !rounded-none ">
                      Remove
                    </Button>
                  </div>

                  <div>
                    <SendMessagePopOverFromTenant receiverId={item?.property?.owner?.userId} />
                  </div>
                </div>
              </div>
              <hr className="border   block" />

              <div className="flex justify-between items-center px-2 py-4 lg:p-5">
                <div>
                  <h2 className="text-xl lg:text-4xl mb-2">${item?.property?.monthlyRent?.toLocaleString()}/month</h2>
                  <h2 className="lg:text-xl">
                    <span>{item?.property?.numOfBed ?? "0"} Bed</span> <span>{item?.property?.numOfBath ? item?.property?.numOfBath : "0"} Bath</span>
                  </h2>
                  <h2 className="lg:text-xl">{item?.property?.address ? item?.property?.address : "--"}</h2>
                </div>
                <div className="mr-2">
                  <Score score={item?.property?.scoreRatio?.score} total={item?.property?.scoreRatio?.total} />
                </div>
              </div>
              {/* */}
              <div>
                {/* buttons */}
                <div className="flex mx-3">
                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 1 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                  >
                    Description
                  </button>

                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 2 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Maintenance
                  </button>

                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 3 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                  >
                    Schools
                  </button>

                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full text-white ${openTab === 4 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}
                  >
                    Pets
                  </button>
                </div>
                {/* contents */}
                <div className=" px-2.5 py-5 w-full block">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    {/* brief introduction section */}
                    <div className="pb-5">
                      <h2 className="text-base font-bold capitalize">Description</h2>

                      <div className="whitespace-pre-wrap text-justify">
                        <p>{item?.property.description ? item?.property.description : "--"}</p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <div className="grid grid-cols-2 ">
                      <div className="col-span-1 border-r  p-1">
                        <h2 className="text-center font-semibold text-lg">Maintenance covered by Tenant</h2>
                        <p className="mt-5 whitespace-pre-wrap ">
                          {item?.property?.maintenanceCoveredTenant ? item?.property?.maintenanceCoveredTenant : "N/A"}
                        </p>
                      </div>

                      <div className="col-span-1 p-1 pl-1.5">
                        <h2 className="text-center font-semibold text-lg">Maintenance covered by Property Owner</h2>
                        <p className="mt-5 whitespace-pre-wrap">
                          {item?.property?.maintenanceCoveredOwner ? item?.property?.maintenanceCoveredOwner : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <div>
                      <h2 className="text-base font-bold capitalize">Schools near by</h2>
                      <div className="">
                        <div>
                          <p className="whitespace-pre-wrap text-justify">{item?.property?.schools ? item?.property?.schools : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-base font-bold capitalize">Universities near by</h2>
                      <div className="">
                        <p className="whitespace-pre-wrap">{item?.property?.universities ? item?.property?.universities : "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                    <h2 className="text-base font-bold capitalize">Pets Allowed</h2>
                    <div className="">
                      <p className="whitespace-pre-wrap text-justify">{item?.property?.pets ? item?.property?.pets : "N/A"}</p>
                    </div>
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

export default SavedUnitsModal;
