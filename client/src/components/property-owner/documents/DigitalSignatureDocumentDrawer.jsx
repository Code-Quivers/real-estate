"use client";
import { fileUrlKey } from "@/configs/envConfig";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const DigitalSignatureDocumentDrawer = ({ filePath }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const [pageWidth, setPageWidth] = useState(300);
  useEffect(() => {
    // Calculate page width based on viewport width or container width
    const width = window.innerWidth * 0.395; // You can adjust the percentage as needed
    setPageWidth(width);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="border p-2 shadow-xl min-h-[300px]">
        <Document file={`${fileUrlKey()}/${filePath}`} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height={450} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>
      {/* Pagination */}
      <div className="mt-6 flex  items-center">
        <button
          type="button"
          onClick={prevPage}
          disabled={pageNumber === 1}
          className={`px-4 py-2 rounded-md ${
            pageNumber === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="mx-4 my-2 md:my-0 text-lg">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          type="button"
          onClick={nextPage}
          disabled={pageNumber === totalPages}
          className={`px-4 py-2 rounded-md ${
            pageNumber === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DigitalSignatureDocumentDrawer;
