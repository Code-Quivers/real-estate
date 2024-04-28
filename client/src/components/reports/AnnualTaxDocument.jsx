"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import testPdf from "./Asymmetric key encryption is used-1.pdf";
import { fileUrlKey } from "@/configs/envConfig";
const AnnualTaxDocument = ({ reportData }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ allPages }) => {
    setNumPages(allPages);
  };

  return (
    <div>
      <Document file={`${fileUrlKey()}/${reportData?.documentFile}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default AnnualTaxDocument;
