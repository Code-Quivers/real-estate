"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { fileUrlKey } from "@/configs/envConfig";
import { LuSend } from "react-icons/lu";
import Link from "next/link";
import { Text } from "rsuite";
const DocumentList = ({ singleTemplate, idx }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
  const [allPages, setAllPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setAllPages(numPages);
  };
  // console.log(`${fileUrlKey()}/documents/${singleTemplate?.filePath}`);
  return (
    <>
      <Document className="border shadow" file={`${fileUrlKey()}/${singleTemplate?.filePath}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={230} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        <div className="flex justify-between items-start px-2 rounded-b-md py-3">
          <Text maxLines={1} className="w-3/4 text-sm !text-black">
            {singleTemplate?.title}
          </Text>
          <div className="flex gap-3">
            <Link href={`/property-owner/documents/send-document/${idx}`} className="">
              <LuSend size={18} />
            </Link>
            <AiOutlineDelete size={18} className="cursor-pointer" />
          </div>
        </div>
        {/* {Array.from(new Array(allPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
        ))} */}
      </Document>
    </>
  );
};

export default DocumentList;
