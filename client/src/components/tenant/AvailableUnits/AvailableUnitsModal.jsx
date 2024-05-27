"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Drawer, IconButton, useMediaQuery, useToaster } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";
import { HiMiniBookmark } from "react-icons/hi2";
import "react-quill/dist/quill.bubble.css";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import { SaveUnitNotificationError, SaveUnitNotificationSuccess } from "@/components/toasts/notifications/ToastNotification";
import SendMessagePopOver from "@/components/Shared/modal/SendMessagePopOverFromTenant";
import Score from "@/components/Shared/Score/Score";
import { CgClose } from "react-icons/cg";
import AvailableUnitsModalSwiper from "./swiper/AvailableUnitsModalSwiper";

const AvailableUnitsModal = ({ open, setOpen, unitInfo }) => {
  const [isMobile] = useMediaQuery(["(max-width: 700px)"]);
  const handleClose = () => setOpen(false);
  const [openTab, setOpenTab] = useState(1);

  // ! save item

  const [saveItem, { data: saveData, isSuccess, isLoading, isError, error, reset }] = useSaveItemMutation();

  const saveUnitData = async () => {
    const unitData = {
      propertyId: unitInfo?.propertyId,
      itemType: "PROPERTY",
    };

    await saveItem(unitData);
  };
  // !
  const toaster = useToaster();
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(SaveUnitNotificationSuccess(saveData?.message), {
        placement: "bottomStart",
      });
      reset();
    }
    if (isError && !isSuccess && error && !isLoading) {
      toaster.push(SaveUnitNotificationError(error?.message), {
        placement: "bottomStart",
      });
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
              <AvailableUnitsModalSwiper unitImage={unitInfo} />
              {/* <Carousel className="custom-slider max-h-[250px]">
                {unitInfo?.images?.length > 0
                  ? unitInfo?.images?.map((photo, index) => (
                      <div key={index}>
                        <Image className="w-full h-full object-cover" height={300} width={300} src={`${fileUrlKey()}/${photo}`} alt="Unit Photo" />
                      </div>
                    ))
                  : null}
              </Carousel> */}

              <div className="max-md:hidden md:col-span-5 w-full  overflow-y-scroll lg:max-h-[92vh] 2xl:max-h-[95vh]  3xl:max-h-[95vh] custom-scrollbar">
                {unitInfo?.images?.length
                  ? unitInfo?.images?.map((photo) => (
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
                <div className="flex px-3 py-1.5 justify-between items-center  bg-white">
                  {/* owner photo and name */}
                  <div className="flex gap-3 items-center">
                    <div>
                      {unitInfo?.owner?.profileImage ? (
                        <Image
                          src={`${fileUrlKey()}/${unitInfo?.owner?.profileImage}`}
                          width={300}
                          height={300}
                          className="rounded-full object-cover w-[60px] h-[60px]"
                        />
                      ) : (
                        <Avatar circle size="lg" />
                      )}
                    </div>
                    <div>
                      <p>Owner</p>
                      <h1>
                        {unitInfo?.owner?.firstName} {unitInfo?.owner?.lastName}
                      </h1>
                    </div>
                  </div>
                  {/* save and msg button */}
                  <div className="flex gap-3 items-center">
                    <SendMessagePopOver receiverId={unitInfo?.owner?.userId} />
                    <div>
                      <button
                        type="submit"
                        onClick={saveUnitData}
                        className="bg-indigo-100 border hover:bg-indigo-200 text-sm py-2 px-2 rounded-full shadow-sm"
                      >
                        <HiMiniBookmark size={24} className="text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="border   block" />
                <div className="flex justify-between items-center px-2 lg:pt-1 pb-2 ">
                  <div>
                    <h2 className="lg:text-2xl mb-1.5 font-semibold">${unitInfo?.monthlyRent?.toLocaleString()}/month</h2>
                    <h2>{unitInfo?.title}</h2>
                    <h2 className="">
                      <span>{unitInfo?.numOfBed ? unitInfo?.numOfBed : "0"} Bed</span> |
                      <span> {unitInfo?.numOfBath ? unitInfo?.numOfBath : "0"} Bath</span>
                    </h2>
                    <h2>{unitInfo?.address ? unitInfo?.address : "N/A"}</h2>
                  </div>
                  <div className="pr-2">
                    <Score score={unitInfo?.scoreRatio?.score} total={unitInfo?.scoreRatio?.total} />
                  </div>
                </div>
                {/* */}
                <div>
                  {/* buttons */}
                  <div className="grid grid-cols-4 max-sm:px-2 mt-3">
                    <button
                      type="button"
                      className={`
                    text-xs font-medium uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 1 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                    >
                      Description
                    </button>

                    <button
                      type="button"
                      className={`
                    text-xs font-medium uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 2 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
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
                    text-xs font-medium uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 3 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
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
                    text-xs font-medium uppercase rounded-none  py-3  w-full border-r text-white ${openTab === 4 ? "bg-[#3498FF]" : "bg-[#29429F]"}`}
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
                        <h2 className="text-base font-semibold capitalize">Description</h2>
                        <div>
                          <p className="whitespace-pre-wrap text-md">{unitInfo?.description ? unitInfo?.description : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <div className="">
                        <div className="">
                          <h2 className="font-semibold">Maintenance covered by Tenant</h2>
                          <p className="mt-1">{unitInfo?.maintenanceCoveredTenant ? unitInfo?.maintenanceCoveredTenant : "N/A"}</p>
                        </div>

                        <div className="mt-4">
                          <h2 className="font-semibold">Maintenance covered by Property Owner</h2>
                          <p className="mt-1 ">{unitInfo?.maintenanceCoveredOwner ? unitInfo?.maintenanceCoveredOwner : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                      <div>
                        <h2 className="font-semibold capitalize">Schools near by</h2>
                        <div className="">
                          <p className="whitespace-pre-wrap text-md">{unitInfo?.schools ? unitInfo?.schools : "N/A"}</p>
                        </div>
                      </div>
                      <div className="mt-3 border-t pt-2">
                        <h2 className="font-semibold capitalize">Universities near by</h2>
                        <div>
                          <p className="">{unitInfo?.universities ? unitInfo?.universities : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                      <h2 className="text-base font-semibold capitalize ">Pets Allowed</h2>
                      <div className="">
                        <p className="whitespace-pre-wrap text-md">{unitInfo?.allowedPets ? unitInfo?.allowedPets : "N/A"}</p>
                      </div>
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

export default AvailableUnitsModal;
