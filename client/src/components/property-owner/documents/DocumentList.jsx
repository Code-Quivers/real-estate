"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { fileUrlKey } from "@/configs/envConfig";
const DocumentList = ({ singleTemplate }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
  const [allPages, setAllPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setAllPages(numPages);
  };
  console.log(`${fileUrlKey()}/documents/${singleTemplate?.filePath}`);
  return (
    <div className="">
      <Document className="w-[200px]" file={`${fileUrlKey()}/documents/${singleTemplate?.filePath}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={200} height={400} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        <p>{singleTemplate?.title}</p>
        {/* {Array.from(new Array(allPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
        ))} */}
      </Document>
    </div>
  );
};

export default DocumentList;
