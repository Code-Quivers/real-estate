"use client";
import { useGetDocumentsQuery } from "@/redux/features/documents/documentsApi";
import moment from "moment";
import { Loader } from "rsuite";
import { FaDownload } from "react-icons/fa";
import { fileUrlKey } from "@/configs/envConfig";
import TenantUploadDocument from "./TenantUploadDocument";

const TenantDocuments = () => {
  const { data, isLoading } = useGetDocumentsQuery();

  return (
    <div>
      <div>
        <TenantUploadDocument allDocuments={data?.data} />
      </div>

      <div className="mt-10 space-y-3">
        {!isLoading &&
          data?.data?.length > 0 &&
          data?.data?.map((singleDoc) => (
            <div key={singleDoc?.documentId} className="flex justify-between items-center p-4 border rounded-xl shadow-md bg-white">
              <div className="space-y-3">
                <h2>{singleDoc?.documentTitle}</h2>
                <div className="flex  items-center gap-3">
                  <p className="text-slate-400">Added: {moment(singleDoc?.createdAt).format("L")}</p>
                  {singleDoc?.isSignedByTenant && <p className="text-slate-400">Signed: {moment(singleDoc?.updatedAt).format("L")}</p>}
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                {/* <button
                  className="border p-2 text-blue-600 hover:bg-blue-600 hover:border-transparent hover:text-white rounded-full duration-300"
                  onClick={() => {
                    // Handle preview action
                  }}
                >
                  <FaRegEye />
                </button> */}
                <button
                  className="border p-2 text-blue-600 hover:bg-blue-600 hover:border-transparent hover:text-white rounded-full duration-300"
                  onClick={() => {
                    window.open(`${fileUrlKey()}/${singleDoc?.filePath}`, "_blank");
                  }}
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader size="lg" content="Loading..." />
        </div>
      )}
      {!isLoading && !data?.data?.length && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h3 className="font-semibold">No Document Found...</h3>
        </div>
      )}
    </div>
  );
};

export default TenantDocuments;
