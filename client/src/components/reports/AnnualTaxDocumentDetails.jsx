"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { fileUrlKey } from "@/configs/envConfig";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { MdModeEditOutline } from "react-icons/md";
import EditAnnualTaxDocumentModal from "./EditAnnualTaxDocumentModal";

const AnnualTaxDocumentDetails = ({ reportData }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
  const [allPages, setAllPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setAllPages(numPages);
  };

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const router = useRouter();

  // ! editing
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleCloseEdit = () => setIsOpenEdit(false);
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center max-md:p-2 my-5 ">
          <div>
            <button
              type="button"
              className="mt-1 hover:border-gray-300 duration-300 rounded-lg border border-transparent p-1"
              onClick={() => router.push("/property-owner/reports")}
            >
              <IoChevronBack size={24} />
            </button>
          </div>
          <div>
            <h1 className="font-semibold">{reportData?.reportTitle}</h1>
          </div>
        </div>
        <div>
          <button
            onClick={() => setIsOpenEdit(true)}
            type="button"
            className="hover:bg-gray-500 hover:text-white p-2.5 duration-300 transition-all rounded-full "
          >
            <MdModeEditOutline size={25} />
          </button>
        </div>
      </div>
      {/*  document */}
      <div className="flex justify-center">
        <Document
          className=" border shadow-lg min-h-[800px] min-w-[600px]"
          file={`${fileUrlKey()}/${reportData?.documentFile}`}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="flex justify-center items-center">Loading Document...</div>}
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
          {/* {Array.from(new Array(allPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
        ))} */}
        </Document>
      </div>

      {/*  pagination */}
      <div className="flex justify-center">
        <div className="mt-5 flex items-center justify-start  gap-4">
          <p className="text-sm">
            Page {pageNumber || (allPages ? 1 : "--")} of {allPages || "--"}
          </p>
          <span>|</span>
          <button
            type="button"
            className="bg-slate-200 px-3 py-1 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-slate-200 px-3 py-1 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={pageNumber >= allPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
      {/* <p>
        Page {pageNumber} of {allPages}
      </p> */}

      <>
        {/* edit modal */}
        <EditAnnualTaxDocumentModal isOpen={isOpenEdit} handleClose={handleCloseEdit} reportData={reportData} />
      </>
    </div>
  );
};

export default AnnualTaxDocumentDetails;
