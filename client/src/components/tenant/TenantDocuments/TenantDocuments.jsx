"use client";
import { IoEyeOutline } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { useGetDocumentsQuery } from "@/redux/features/documents/documentsApi";
import moment from "moment";

const TenantDocuments = () => {
  const { data, isLoading } = useGetDocumentsQuery();
  return (
    <div>
      <div className="mt-10 space-y-3">
        {!isLoading &&
          data?.data?.map((singleDoc) => (
            <div key={Math.random()} className="flex justify-between items-center p-2 border-2 rounded-lg shadow bg-white">
              <div>
                <h2>{singleDoc?.documentTitle}</h2>
                <p className="text-slate-400">Added: {moment(singleDoc?.createdAt).format("L")}</p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span>
                  <IoEyeOutline className="text-blue-600" />
                </span>
                <span>
                  <GoDownload className="text-blue-600" />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TenantDocuments;
