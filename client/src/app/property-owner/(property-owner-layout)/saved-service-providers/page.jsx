"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";
import Image from "next/image";
import { useState } from "react";
import { Modal, Progress } from "rsuite";
import { CgClose } from "react-icons/cg";
import RemoveFromSavedServiceProviderModal from "@/components/property-owner/availableServiceProviders/RemoveFromSavedServiceProviderModal";

const PropertyOwnerSavedServiceProviders = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = (selectData) => {
    setModalData(selectData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const query = {};

  const [itemType, setItemType] = useState("SERVICE");

  query["itemType"] = itemType;

  const { data } = useGetAllSavedItemsQuery({ ...query });

  return (
    <>
      <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl font-medium">Saved Service Providers</h2>
        </div>
        {/* saved service providers */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data?.data?.data?.length
            ? data?.data?.data?.map((singleReq) => (
                <div key={Math.random()} className="col-span-1 relative">
                  <div className="   border grid grid-cols-5 justify-between items-center shadow-lg rounded-lg px-2 border-[#acacac]  gap-2">
                    <div className=" col-span-1">
                      <Image
                        height={80}
                        width={80}
                        className=" !w-[80px]  !h-[80px] object-cover     rounded-full  "
                        src={singleReq?.ServiceProvider?.profileImage ? `${fileUrlKey()}/${singleReq?.ServiceProvider?.profileImage}` : profileLogo}
                        alt="photo"
                      />
                    </div>
                    <div className="col-span-4 p-5   flex justify-between w-full ">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">
                          <span>{singleReq?.ServiceProvider?.firstName}</span> <span>{singleReq?.ServiceProvider?.lastName}</span>
                        </h3>
                        <h3 className="text-sm font-medium">{"singleReq.placeToRent"}</h3>
                        <h3 className="text-sm font-medium">{"singleReq.ServiceProvider?.affordable"}</h3>
                      </div>
                      <div>
                        <div style={{ width: 80 }}>
                          <Progress.Circle percent={20} strokeColor="green" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* remove  */}
                  <div className="absolute top-0 right-0">
                    <button onClick={() => handleOpen(singleReq)} className="hover:bg-black p-1 rounded-tr-lg  hover:text-white">
                      <CgClose size={20} />
                    </button>
                  </div>
                </div>
              ))
            : "No data"}
        </div>
      </section>
      {/* delete modal */}
      <Modal open={open} size="xs" backdrop="static" onClose={handleClose}>
        <Modal.Body>
          <RemoveFromSavedServiceProviderModal handleClose={handleClose} modalData={modalData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyOwnerSavedServiceProviders;
