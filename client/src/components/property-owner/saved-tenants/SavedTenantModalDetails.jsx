"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Drawer, Modal, Notification, Placeholder, Popover, Whisper, toaster, useMediaQuery } from "rsuite";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { useAssignTenantToPropertyMutation, useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import SendMessagePopOverFromPropertyOwner from "../available-tenants/SendMessagePopOver";
import RemoveFromAvailableTenantsModal from "../available-tenants/RemoveFromSavedTenantsModal";
import moment from "moment";

const SavedTenantModalDetails = ({ isModalOpened, setModalOpened, modalData }) => {
  const handleClose = () => setModalOpened(false);
  const [isMobile] = useMediaQuery("(max-width: 575px)");
  const { data: unitRes, isLoading: isLoadingUnits } = useGetMyAllUnitsQuery();

  const [open, setOpen] = useState(false);
  const [removeModalData, setRemoveModalData] = useState(null);

  const handleOpen = (selectData) => {
    setRemoveModalData(selectData);
    setOpen(true);
  };
  const handleCloseRemove = () => setOpen(false);

  // !

  // !
  const [
    assignTenantToProperty,
    { data: assignRes, isLoading: isLoadingAssign, isSuccess: isSuccessAssign, isError: isErrorAssign, error: errorAssign },
  ] = useAssignTenantToPropertyMutation();

  const handleAddTenantToProperty = async (propertyId) => {
    const assignData = {
      propertyId,
      tenantId: modalData?.tenant?.tenantId,
    };

    await assignTenantToProperty({
      data: assignData,
    });
  };

  // !
  useEffect(() => {
    if (!isLoadingAssign && !isErrorAssign && isSuccessAssign && !errorAssign) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{assignRes?.message ?? "Successfully Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      handleClose();
    }
    if (!isLoadingAssign && isErrorAssign && !isSuccessAssign && errorAssign) {
      toaster.push(
        <Notification type="error" header="Failed" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{errorAssign?.message ?? "Failed to Assigned"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingAssign, isErrorAssign, isSuccessAssign, errorAssign, toaster]);

  return (
    <>
      <Drawer placement={isMobile ? "bottom" : "right"} size={isMobile ? "lg" : "xs"} open={isModalOpened} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>
            <span className="font-bold">Tenant Details</span>
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ padding: 0 }}>
          <div className="p-5">
            {/* top items */}

            <div className="flex items-center gap-2 lg:gap-5 ">
              <div className="">
                <Image
                  width={100}
                  height={100}
                  className="!w-[80px]   !h-[80px] object-cover   rounded-full  "
                  src={modalData?.tenant?.profileImage ? `${fileUrlKey()}/${modalData?.tenant?.profileImage}` : profileLogo}
                  alt="Tenant Photo"
                />
              </div>
              {/* tenant data top */}
              <div className="space-y-1">
                <h3 className="max-md:font-medium">
                  {modalData?.tenant?.firstName} {modalData?.tenant?.lastName}
                </h3>
                <h3 className="max-md:text-sm ">Place to rent : {modalData?.tenant?.placeToRent ? modalData?.tenant?.placeToRent : "N/A"} </h3>
                <h3 className="max-md:text-sm">
                  Rent willing to pay :{" "}
                  {modalData?.tenant?.affordableRentAmount ? `$${modalData?.tenant?.affordableRentAmount?.toLocaleString()}` : "N/A"}
                </h3>
              </div>
            </div>

            {/* action */}
            <div className="flex py-3 gap-3 justify-between items-center">
              <div className="flex w-full gap-3">
                <div className="w-full">
                  <button
                    //   loading={isLoading}
                    onClick={() => handleOpen(modalData)}
                    className="text-primary w-full text-sm py-2 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]"
                  >
                    Remove
                  </button>
                </div>
                {/* add */}
                <div className="w-full">
                  <Whisper
                    preventOverflow
                    placement="autoHorizontal"
                    trigger="click"
                    speaker={
                      <Popover className="max-h-[450px] max-w-[350px] !rounded-md overflow-y-auto mb-5" arrow={false}>
                        <div className="space-y-2">
                          {!isLoadingUnits &&
                            unitRes?.data?.length > 0 &&
                            unitRes?.data?.map((singleUnit) => (
                              <div key={Math.random()}>
                                <button
                                  onClick={() => handleAddTenantToProperty(singleUnit?.propertyId)}
                                  className="grid grid-cols-3 border rounded-lg hover:border-primary  duration-300 transition-all text-start"
                                >
                                  <div className="col-span-1">
                                    <Image
                                      width={500}
                                      height={500}
                                      className="w-[120px] h-[100px] p-1 object-cover rounded-xl"
                                      src={singleUnit?.images?.length ? `${fileUrlKey()}/${singleUnit?.images[0]}` : profileLogo}
                                      alt="photo"
                                    />
                                  </div>
                                  <div className="flex w-full flex-col justify-between my-2 text-sm col-span-2 px-2">
                                    <h3 className="font-semibold line-clamp-1">${singleUnit?.monthlyRent?.toLocaleString()}</h3>
                                    <h3 className="line-clamp-1">
                                      {singleUnit?.numOfBed} Beds | {singleUnit?.numOfBath} Bath
                                    </h3>
                                    <h3 className="line-clamp-2">{singleUnit?.address}</h3>
                                  </div>
                                </button>
                              </div>
                            ))}

                          {isLoadingUnits && (
                            <div className=" mt-10 gap-y-5 flex flex-col">
                              <div>
                                <Placeholder.Graph active height={150} />
                              </div>
                              <div>
                                <Placeholder.Graph active height={150} />
                              </div>
                            </div>
                          )}

                          {/* if no data is available */}
                          {!isLoadingUnits && !unitRes?.data?.length && (
                            <div className="flex justify-center min-h-[10vh] items-center">
                              <h2 className="text-2xl font-semibold text-rose-400">No Available Unit Found !</h2>
                            </div>
                          )}
                        </div>
                      </Popover>
                    }
                  >
                    <button className="text-primary w-full text-sm py-2 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]">Add</button>
                  </Whisper>
                </div>
              </div>
              {/* Contact  */}
              <SendMessagePopOverFromPropertyOwner receiverId={modalData?.tenant?.user?.userId} />
            </div>
            {/* Tenant data bottom */}
            <div className="pt-2 mt-2 space-y-2">
              {/* Personal Information */}
              <div className="border p-2 rounded-md  space-y-2 shadow">
                <h4 className="text-sm font-medium">Personal Information</h4>
                <div className="*:text-sm  space-y-1">
                  <div className="flex justify-between items-center">
                    <h4>Date Of Birth</h4>
                    <h4>{modalData?.tenant?.dateOfBirth ? moment(modalData?.tenant?.dateOfBirth).format("L") : "N/A"}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Present Address</h4>
                    <h4>{modalData?.tenant?.presentAddress || "N/A"}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Phone Number</h4>
                    <h4>{modalData?.tenant?.phoneNumber ? modalData?.tenant?.phoneNumber.replace(/\d/g, "X") : "N/A"}</h4>
                  </div>
                </div>
              </div>
              {/* Personal Information
               */}
              <div className="border p-2 rounded-md  space-y-2 shadow">
                <h4 className="text-sm font-medium">Income Information</h4>
                <div className="*:text-sm space-y-1 ">
                  <div className="flex justify-between items-center">
                    <h4>Current Employer/Business Name </h4>
                    <h4>{modalData?.tenant?.CurrentEmployerOrBusinessName ? modalData?.tenant?.CurrentEmployerOrBusinessName : "N/A"}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Job Title</h4>
                    <h4>{modalData?.tenant?.JobTitle || "N/A"}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Current Credit Score</h4>
                    <h4>{modalData?.tenant?.CurrentCreditScore || "N/A"}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Annual Salary</h4>
                    <h4>{modalData?.tenant?.AnnualSalary ? `$${modalData?.tenant?.AnnualSalary.toLocaleString()}` : "N/A"}</h4>
                  </div>
                </div>
                {/* Other Information    */}
              </div>
              <div className="border p-2 rounded-md  space-y-1 shadow">
                <h4 className="text-sm font-medium">Other Information</h4>
                <div className="*:text-sm  space-y-1">
                  <div className="flex justify-between items-center">
                    <h4>Number Of Member </h4>
                    <h4>{modalData?.tenant?.numberOfMember ? modalData?.tenant?.numberOfMember : "N/A"}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Does have Allergies</h4>
                    <h4>
                      {modalData?.tenant?.allergies !== undefined && modalData?.tenant?.allergies !== null
                        ? modalData?.tenant?.allergies
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4>Is Smoker</h4>
                    <h4>
                      {modalData?.tenant?.isSmoker !== undefined && modalData?.tenant?.isSmoker !== null
                        ? modalData?.tenant?.isSmoker
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      {/* delete modal */}
      <Modal open={open} size="xs" dialogAs="div" overflow={false} className="bg-white mx-auto" backdrop="static" onClose={handleClose}>
        <Modal.Body>
          <RemoveFromAvailableTenantsModal handleClose={handleCloseRemove} handleCloseDrawer={handleClose} modalData={removeModalData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SavedTenantModalDetails;
