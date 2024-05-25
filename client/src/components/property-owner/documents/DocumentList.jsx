"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { fileUrlKey } from "@/configs/envConfig";

const DocumentList = ({ singleTemplate, setRemoveData, setIsOpenRemoveModal }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
  const [allPages, setAllPages] = useState(null);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setAllPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error while loading document:", error);
    setLoading(false);
  };

  return (
    <>
      <div className="border shadow w-full max-w-xs mx-auto">
        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="spinner border-t-4 border-b-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}
        <Document file={`${fileUrlKey()}/${singleTemplate?.filePath}`} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
          <div className={`w-full max-w-xs mx-auto ${loading ? "hidden" : ""}`}>
            <Page width={240} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} className="w-full !max-w-[230px] mx-auto" />
          </div>
        </Document>
        <div className="flex justify-between items-start px-2 rounded-b-md py-3">
          <div className="w-3/4 text-sm text-black truncate">{singleTemplate?.title}</div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setRemoveData(singleTemplate);
                setIsOpenRemoveModal(true);
              }}
            >
              <AiOutlineDelete size={18} className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentList;
