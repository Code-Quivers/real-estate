"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { fileUrlKey } from "@/configs/envConfig";
const AnnualTaxDocument = ({ reportData }) => {
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

  return (
    <div className="max-w-3xl mx-auto">
      <Document className=" md:w-[200px]" file={`${fileUrlKey()}/${reportData?.documentFile}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        {/* {Array.from(new Array(allPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
        ))} */}
      </Document>
      <div className="mt-5 flex items-center  gap-4">
        <p className="text-sm">
          Page {pageNumber || (allPages ? 1 : "--")} of {allPages || "--"}
        </p>
        <span>|</span>
        <button type="button" className="bg-slate-200 px-3 py-1 rounded-lg" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button type="button" className="bg-slate-200 px-3 py-1 rounded-lg" disabled={pageNumber >= allPages} onClick={nextPage}>
          Next
        </button>
      </div>
      {/* <p>
        Page {pageNumber} of {allPages}
      </p> */}
    </div>
  );
};

export default AnnualTaxDocument;
