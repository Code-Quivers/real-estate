"use client";

import { useState } from "react";
import { Button } from "rsuite";
import AddDocumentModalForm from "./AddDocumentModalForm";
import { useGetMyAllDocumentTemplatesQuery } from "@/redux/features/documents/documentsApi";
import Link from "next/link";

const DocumentPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => setOpenAdd(false);
  //!
  const { data, isLoading } = useGetMyAllDocumentTemplatesQuery();

  return (
    <div>
      <div className="flex justify-center items-center py-10">
        <h2 className="text-3xl font-semibold">Document Templates</h2>
      </div>
      {/*  */}
      <div className="">
        {!isLoading &&
          data?.data?.map((singleTemplate, idx) => (
            <div key={Math.random()} className="border p-5 flex justify-between items-center rounded-lg shadow-lg">
              <div>
                <h2>{singleTemplate?.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/property-owner/documents/send-document/${idx}`}>send</Link>
                <button>remove</button>
              </div>
            </div>
          ))}
        {/* add template */}
        <div className="mt-10">
          <Button onClick={() => setOpenAdd(true)} appearance="ghost">
            + Add new document
          </Button>
        </div>
      </div>

      {/* Add template modal */}
      <AddDocumentModalForm open={openAdd} handleClose={handleClose} />
    </div>
  );
};

export default DocumentPage;
