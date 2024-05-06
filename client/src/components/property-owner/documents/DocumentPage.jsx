"use client";

import { useState } from "react";
import { Button } from "rsuite";
import AddDocumentModalForm from "./AddDocumentModalForm";
import { useGetMyAllDocumentTemplatesQuery } from "@/redux/features/documents/documentsApi";
import DocumentList from "./DocumentList";

const DocumentPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => setOpenAdd(false);
  //!
  const { data, isLoading } = useGetMyAllDocumentTemplatesQuery();

  return (
    <div>
      <div className="flex justify-center items-center py-5">
        <h2 className="text-3xl font-semibold">Document Templates</h2>
      </div>
      {/* add template */}
      <div className="my-5 flex justify-end">
        <Button onClick={() => setOpenAdd(true)} appearance="ghost">
          + Add new document
        </Button>
      </div>
      {/*  */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {!isLoading &&
          data?.data?.length > 0 &&
          data?.data?.map((singleTemplate, idx) => <DocumentList key={idx} singleTemplate={singleTemplate} idx={idx} />)}
      </div>

      {/* if not data */}
      {!isLoading && !data?.data?.length && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h2>No Templates Found</h2>
        </div>
      )}

      {/* Add template modal */}
      <AddDocumentModalForm open={openAdd} handleClose={handleClose} />
    </div>
  );
};

export default DocumentPage;
