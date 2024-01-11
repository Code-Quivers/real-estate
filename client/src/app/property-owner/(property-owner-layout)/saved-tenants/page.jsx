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
import RemoveFromAvailableTenantsModal from "@/components/property-owner/available-tenants/RemoveFromAvailableTenantsModal";

const PropertyOwnerSavedTenants = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = (selectData) => {
    setModalData(selectData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const query = {};

  const [itemType, setItemType] = useState("TENANT");

  query["itemType"] = itemType;

  const { data } = useGetAllSavedItemsQuery({ ...query });

  return (
    <>
      <section className="max-w-[1050px]  mb-5 mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl font-medium">Saved Tenants</h2>
        </div>
        {/* saved tenants */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {data?.data?.data?.length
            ? data?.data?.data?.map((singleReq) => (
                <div key={Math.random()} className="col-span-1 relative">
                  <div className="   border grid grid-cols-5 justify-between items-center shadow-lg rounded-lg px-2 border-[#acacac]  gap-2">
                    <div className=" col-span-1">
                      <Image
                        height={80}
                        width={80}
                        className=" !w-[80px]  !h-[80px] object-cover     rounded-full  "
                        src={`${fileUrlKey()}/${
                          singleReq?.tenant?.profileImage
                        }`}
                        alt="photo"
                      />
                    </div>
                    <div className="col-span-4 p-5   flex justify-between w-full ">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">
                          <span>{singleReq?.tenant?.firstName}</span>{" "}
                          <span>{singleReq?.tenant?.lastName}</span>
                        </h3>
                        <h3 className="text-sm font-medium">
                          {"singleReq.placeToRent"}
                        </h3>
                        <h3 className="text-sm font-medium">
                          {"singleReq.tenant?.affordable"}
                        </h3>
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
                    <button
                      onClick={() => handleOpen(singleReq)}
                      className="hover:bg-black p-1 rounded-tr-lg  hover:text-white"
                    >
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
          <RemoveFromAvailableTenantsModal
            handleClose={handleClose}
            modalData={modalData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyOwnerSavedTenants;
