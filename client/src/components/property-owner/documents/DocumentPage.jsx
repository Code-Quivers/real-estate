"use client";

import { useState } from "react";
import { Avatar, Button, Loader } from "rsuite";
import AddDocumentModalForm from "./AddDocumentModalForm";
import { useGetMyAllDocumentTemplatesQuery } from "@/redux/features/documents/documentsApi";
import DocumentList from "./DocumentList";
import { useGetMyTenantsQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { fileUrlKey } from "@/configs/envConfig";
import SendDocumentModal from "./SendDocumentModal";
import RemoveTemplateModal from "./RemoveTemplateModal";

const DocumentPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => setOpenAdd(false);
  const [openSend, setOpenSend] = useState(false);
  const [sendModalData, setSendModalData] = useState(null);
  const handleCloseSend = () => setOpenSend(false);
  //!
  const { data, isLoading } = useGetMyAllDocumentTemplatesQuery();
  const { data: tenantData, isLoading: isTenantDataLoading } = useGetMyTenantsQuery();

  // ! remove modal
  //
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const handleCloseRemove = () => setIsOpenRemoveModal(false);
  const [removeData, setRemoveData] = useState(null);

  return (
    <div>
      <div className="flex justify-center">
        <div className=" w-full max-w-3xl mx-auto">
          <div className="flex justify-center items-center py-5">
            <h2 className="text-3xl font-semibold">Document Sent</h2>
          </div>
          {/* list of tenant */}
          <div className="w-full space-y-3">
            {!isTenantDataLoading &&
              tenantData?.data?.map((singleTenant) => (
                <div key={Math.random()} className="md:flex justify-between  items-start gap-5 border bg-white shadow-md p-5 rounded-lg">
                  <div className="sm:flex items-center gap-3">
                    <div>
                      <Avatar
                        className="object-cover rounded-full h-[90px] w-[90px]"
                        src={`${fileUrlKey()}/${singleTenant?.Tenant?.profileImage}`}
                        size="md"
                        circle
                      />
                    </div>
                    <div>
                      <h2 className="text-lg">
                        {singleTenant?.Tenant?.firstName} {singleTenant?.Tenant?.lastName}
                      </h2>
                      <h2 className="text-lg">Place to rent : {singleTenant?.Tenant?.placeToRent || "N/A"}</h2>
                      <h2 className="text-lg">
                        Rent willing to pay :{" "}
                        {singleTenant?.Tenant?.affordableRentAmount ? `$${singleTenant?.Tenant?.affordableRentAmount?.toLocaleString()}` : "N/A"}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        setSendModalData(singleTenant);
                        setOpenSend(true);
                      }}
                      size="lg"
                      className="!bg-primary !text-white !text-sm max-md:w-full max-md:mt-2 md:!text-xl !sm:px-7 !py-2"
                    >
                      Send Document
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          {/* if nothing */}
          {!isTenantDataLoading && !tenantData?.data?.length > 0 && (
            <div className="flex justify-center items-center min-h-[30vh]">
              <h2>No Tenant Found</h2>
            </div>
          )}
          {/* if loading */}
          {isTenantDataLoading && (
            <div className="flex justify-center items-center min-h-[30vh]">
              <Loader size="lg" content="Loading" />
            </div>
          )}
          {/*  */}
        </div>
      </div>
      {/*  */}
      <div className="flex justify-between mt-20 items-center py-5">
        <h2 className="text-3xl font-semibold">Document Templates</h2>
        <Button onClick={() => setOpenAdd(true)} appearance="ghost">
          + Add new document
        </Button>
      </div>

      {/* add template */}
      <div className="my-5 flex justify-end"></div>

      {/* template list */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-[230px] gap-4 justify-center">
        {!isLoading &&
          data?.data?.length > 0 &&
          data?.data?.map((singleTemplate, idx) => (
            <div key={idx} className="w-full max-w-xs mx-auto">
              <DocumentList setRemoveData={setRemoveData} setIsOpenRemoveModal={setIsOpenRemoveModal} singleTemplate={singleTemplate} idx={idx} />
            </div>
          ))}
      </div>

      {/* if not data */}
      {!isLoading && !data?.data?.length && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h2>No Templates Found</h2>
        </div>
      )}

      {/* Add template modal */}
      <AddDocumentModalForm open={openAdd} handleClose={handleClose} />

      {/* Send document modal */}
      <SendDocumentModal open={openSend} handleClose={handleCloseSend} sendModalData={sendModalData} />

      {/* remove template modal */}
      <RemoveTemplateModal open={isOpenRemoveModal} handleClose={handleCloseRemove} modalData={removeData} />
    </div>
  );
};

export default DocumentPage;
