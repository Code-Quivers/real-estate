"use client";

import { useState } from "react";
import { Button, Loader } from "rsuite";
import AddDocumentModalForm from "./AddDocumentModalForm";
import { useGetMyAllDocumentTemplatesQuery } from "@/redux/features/documents/documentsApi";
import DocumentList from "./DocumentList";
import { useGetMyTenantsQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import Image from "next/image";
import { fileUrlKey } from "@/configs/envConfig";
import SendDocumentModal from "./SendDocumentModal";

const DocumentPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => setOpenAdd(false);
  const [openSend, setOpenSend] = useState(false);
  const [sendModalData, setSendModalData] = useState(null);
  const handleCloseSend = () => setOpenSend(false);
  //!
  const { data, isLoading } = useGetMyAllDocumentTemplatesQuery();
  const { data: tenantData, isLoading: isTenantDataLoading } = useGetMyTenantsQuery();

  return (
    <div>
      <div className="flex justify-center">
        <div className=" w-full max-w-3xl mx-auto">
          <div className="flex justify-center items-center py-5">
            <h2 className="text-3xl font-semibold">Document Sent</h2>
          </div>

          <div className="w-full space-y-3">
            {!isTenantDataLoading &&
              tenantData?.data?.map((singleTenant) => (
                <div key={Math.random()} className="md:flex justify-between  items-start gap-5 border bg-white shadow-md p-5 rounded-lg">
                  <div className="sm:flex items-center gap-3">
                    <div>
                      {singleTenant?.Tenant?.profileImage ? (
                        <Image
                          className="object-cover rounded-full h-[90px] w-[90px]"
                          src={`${fileUrlKey()}/${singleTenant?.Tenant?.profileImage}`}
                          width={90}
                          height={90}
                        />
                      ) : (
                        "No"
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg">
                        {singleTenant?.Tenant?.firstName} {singleTenant?.Tenant?.lastName}
                      </h2>
                      <h2 className="text-lg">Place to rent : {singleTenant?.Tenant?.placeToRent || "N/A"}</h2>
                      <h2 className="text-lg">
                        Rent willing to pay : {singleTenant?.Tenant?.affordableRentAmount ? `$ ${singleTenant?.Tenant?.affordableRentAmount}` : "N/A"}
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
      <div className="flex justify-center items-center py-5">
        <h2 className="text-3xl font-semibold">Document Templates</h2>
      </div>

      {/* add template */}
      <div className="my-5 flex justify-end">
        <Button onClick={() => setOpenAdd(true)} appearance="ghost">
          + Add new document
        </Button>
      </div>

      {/*  */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-[230px] gap-4 justify-center">
        {!isLoading &&
          data?.data?.length > 0 &&
          data?.data?.map((singleTemplate, idx) => <DocumentList key={idx} singleTemplate={singleTemplate} idx={idx} />)}
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
    </div>
  );
};

export default DocumentPage;
