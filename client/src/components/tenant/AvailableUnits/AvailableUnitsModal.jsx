"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Carousel, Modal, useToaster } from "rsuite";
import { fileUrlKey } from "@/configs/envConfig";
import "react-quill/dist/quill.bubble.css";
import { useSaveItemMutation } from "@/redux/features/propertyOwner/savedItemApi";
import { SaveUnitNotificationError, SaveUnitNotificationSuccess } from "@/components/toasts/notifications/ToastNotification";
import SendMessagePopOver from "@/components/Shared/modal/SendMessagePopOverFromTenant";
import Score from "@/components/Shared/Score/Score";

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
      <Modal dialogAs="div" className="mx-auto bg-white" overflow={false} size="lg" open={open} onClose={handleClose}>
        <Modal.Body className="!p-0 !overflow-y-hidden">
          <div className="grid md:grid-cols-12 border   justify-between   items-stretch  ">
            <Carousel className="custom-slider max-h-[250px] md:col-span-5 md:hidden">
              {unitInfo?.images?.length > 0
                ? unitInfo?.images?.map((photo) => (
                    <div key={Math.random()}>
                      <Image className="w-full h-full object-cover" height={300} width={300} src={`${fileUrlKey()}/${photo}`} alt="Unit Photo" />
                    </div>
                  ))
                : null}
            </Carousel>
            <div className="max-md:hidden lg:col-span-5 w-full  overflow-y-scroll lg:max-h-[80vh]   custom-scrollbar">
              {unitInfo?.images?.length
                ? unitInfo?.images?.map((photo) => (
                    <div key={Math.random()} className="flex flex-col divide-y divide-[#8b8b8b]">
                      <div className=" ">
                        <Image
                          className="h-[200px] p-1 w-full object-cover"
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
            <div className="lg:col-span-7 w-full overflow-y-scroll lg:max-h-[80vh]  custom-scrollbar mt-2">
              <div className="flex px-3 py-2  justify-between items-center sticky top-0 bg-white">
                <div>
                  {unitInfo?.owner?.profileImage ? (
                    <Image src={`${fileUrlKey()}/${unitInfo?.owner?.profileImage}`} width={70} height={70} className="rounded-md object-cover" />
                  ) : (
                    "Logo"
                  )}
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
              <div className="flex justify-between items-center px-2 py-4 lg:p-5">
                <div>
                  <h2 className="lg:text-4xl mb-2">${unitInfo?.monthlyRent?.toLocaleString()}/month</h2>
                  <h2 className="lg:text-xl">
                    <span>{unitInfo?.numOfBed ? unitInfo?.numOfBed : "0"} Bed</span>{" "}
                    <span>{unitInfo?.numOfBath ? unitInfo?.numOfBath : "0"} Bath</span>
                  </h2>
                  <h2 className="lg:text-xl">{unitInfo?.address ? unitInfo?.address : "N/A"}</h2>
                </div>
                <div>
                  <Score score={unitInfo?.scoreRatio?.score} total={unitInfo?.scoreRatio?.total} />
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
                      <h2 className="text-base font-semibold capitalize">Description</h2>
                      <div>
                        <p className="whitespace-pre-wrap text-md">{unitInfo?.description ? unitInfo?.description : "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <div className="grid grid-cols-2   ">
                      <div className="col-span-1 border-r mr-3    p-0.5">
                        <h2 className="text-center font-semibold text-sm ld:text-lg">Maintenance covered by Tenant</h2>
                        <p className="mt-5 whitespace-pre-line text-md">
                          {unitInfo?.maintenanceCoveredTenant ? unitInfo?.maintenanceCoveredTenant : "N/A"}
                        </p>
                      </div>

                      <div className="col-span-1 p-0.5">
                        <h2 className="text-center font-semibold text-sm ld:text-lg">Maintenance covered by Property Owner</h2>
                        <p className="mt-5 whitespace-pre-line text-md">
                          {unitInfo?.maintenanceCoveredOwner ? unitInfo?.maintenanceCoveredOwner : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <div>
                      <h2 className="text-base font-bold capitalize">Schools near by</h2>
                      <div className="">
                        <p className="whitespace-pre-wrap text-md">{unitInfo?.schools ? unitInfo?.schools : "N/A"}</p>
                      </div>
                    </div>
                    <div className="mt-3 border-t pt-2">
                      <h2 className="text-base font-bold capitalize">Universities near by</h2>
                      <div className="">
                        <p className="whitespace-pre-wrap text-md">{unitInfo?.universities ? unitInfo?.universities : "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                    <h2 className="text-base font-bold capitalize ">Pets Allowed</h2>
                    <div className="">
                      <p className="whitespace-pre-wrap text-md">{unitInfo?.allowedPets ? unitInfo?.allowedPets : "N/A"}</p>
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
