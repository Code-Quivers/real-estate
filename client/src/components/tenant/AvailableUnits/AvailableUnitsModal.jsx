"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Button, Carousel, Modal, useToaster } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";
import "react-quill/dist/quill.bubble.css";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import { SaveUnitNotificationError, SaveUnitNotificationSuccess } from "@/components/toasts/notifications/ToastNotification";
import SendMessagePopOver from "@/components/Shared/modal/SendMessagePopOverFromTenant";

const AvailableUnitsModal = ({ open, setOpen, unitInfo }) => {
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
  console.log("unitInfo", unitInfo);
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
      <Modal overflow={false} size="lg" open={open} onClose={handleClose}>
        <Modal.Body className="!p-0 !overflow-y-hidden">
          <div className="grid md:grid-cols-12 border border-[#9e9a97] justify-between divide-x  items-stretch divide-[#9e9a97]">
            <Carousel className="custom-slider col-span-6 md:hidden">
              {unitInfo?.images?.length > 0
                ? unitInfo?.images?.map((photo) => (
                    <div key={Math.random()}>
                      <Image
                        className="w-full h-full object-cover"
                        height={300}
                        width={300}
                        src={`${fileUrlKey()}/${photo}`}
                        alt="Unit Photo"
                      />
                    </div>
                  ))
                : null}
            </Carousel>
            <div className="max-md:hidden col-span-6 w-full  overflow-y-scroll max-h-[95vh]  custom-scrollbar">
              {unitInfo?.images?.length
                ? unitInfo?.images?.map((photo) => (
                    <div key={Math.random()} className="flex flex-col divide-y divide-[#8b8b8b]">
                      <div className=" ">
                        <Image
                          className="h-[200px] p-3 w-full object-cover"
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
            <div className="col-span-6 w-full overflow-y-scroll md:max-h-[95vh] custom-scrollbar mt-2">
              <div className="flex p-5  justify-between items-center sticky top-0 bg-white">
                <div>
                  <h2>Logo</h2>
                </div>
                <div className="flex gap-2.5 items-center">
                  <div>
                    <Button onClick={saveUnitData} className="!bg-primary w-full !text-white !px-3.5 !py-1 !text-base !rounded-none ">
                      Save
                    </Button>
                  </div>
                  <div>
                    <SendMessagePopOver receiverId={unitInfo?.owner?.userId} />
                  </div>
                </div>
              </div>
              <hr className="border   block" />
              <div className="flex justify-between items-center p-5">
                <div>
                  <h2 className="text-4xl mb-2">$1200/month</h2>
                  <h2 className="text-xl">
                    <span>{unitInfo?.numOfBed ?? "0"} Bed</span> <span>{unitInfo?.numOfBath ?? "0"} Bath</span>
                  </h2>
                  <h2 className="text-xl">{unitInfo?.address ? unitInfo?.address : "3 Belair Dr, Binghamton, NY 13901"}</h2>
                </div>
                <div className=" outline outline-4 md:outline-6 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  px-4">
                  <div className=" flex w-full flex-col justify-center items-center">
                    <span className="font-medium">9</span>
                    <span className="w-[70%] border-t border-[#b6b6b6]" />
                    <span className="font-medium">10</span>
                  </div>
                </div>
              </div>
              {/* */}
              <div>
                {/* buttons */}
                <div className="flex ">
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

                      <div className="ql-editor">
                        {unitInfo?.description ? (
                          <div
                            className="whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                              __html: unitInfo.description,
                            }}
                          />
                        ) : (
                          <p>--</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <div className="grid grid-cols-2   ">
                      <div className="col-span-1 border-r mr-3    p-1">
                        <h2 className="text-center font-semibold text-lg">Maintenance covered by Tenant</h2>
                        <p className="mt-5 whitespace-pre-line">{unitInfo?.maintenanceCoveredTenant ? unitInfo?.maintenanceCoveredTenant : "--"}</p>
                      </div>

                      <div className="col-span-1 p-1">
                        <h2 className="text-center font-semibold text-lg">Maintenance covered by Property Owner</h2>
                        <p className="mt-5 whitespace-pre-line">{unitInfo?.maintenanceCoveredOwner ? unitInfo?.maintenanceCoveredOwner : "--"}</p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <div>
                      <h2 className="text-base font-bold capitalize">Schools near by</h2>
                      <div className="">
                        <div className="ql-editor">
                          {unitInfo?.schools ? (
                            <div
                              className="whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{
                                __html: unitInfo?.schools,
                              }}
                            />
                          ) : (
                            <p>--</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-base font-bold capitalize">Universities near by</h2>
                      <div className="">
                        {unitInfo?.universities ? (
                          <div
                            className="whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                              __html: unitInfo?.universities,
                            }}
                          />
                        ) : (
                          <p>--</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                    <h2 className="text-base font-bold capitalize">Pets Allowed</h2>
                    <div className="">
                      {unitInfo?.pets ? (
                        <div
                          className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: unitInfo?.pets,
                          }}
                        />
                      ) : (
                        <p>--</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AvailableUnitsModal;
