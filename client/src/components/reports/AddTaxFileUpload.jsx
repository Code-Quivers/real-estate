"use client";
import { Uploader, Message, useToaster } from "rsuite";

const AddTaxFileUpload = ({ field }) => {
  const toaster = useToaster();

  const handleChangeImages = (files) => {
    if (files.length > 0) {
      // Take only the first file if multiple files are somehow selected
      const latestFile = files[0]; // Changed from files[files.length - 1]

      const fileSizeLimit = 1024 * 5 * 1024; // 1 MB

      if (latestFile.blobFile?.size && latestFile.blobFile?.size <= fileSizeLimit) {
        const fileType = latestFile.blobFile.type;
        // Check if the file is a PDF
        if (fileType === "application/pdf") {
          field.onChange(latestFile);
          return; // Exit function after successful PDF file upload
        }
      }

      toaster.push(
        <Message centered showIcon bordered type="error">
          Please upload a PDF file within 5 MB.
        </Message>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );
      field.onChange(undefined);
    }
  };

  const handleRemoveFile = () => {
    field.onChange(undefined);
  };

  return (
    <div>
      {field?.value ? (
        <div className="mt-10">
          <div className="flex justify-between gap-5 items-center">
            <div>
              <p className="text-wrap">{field?.value?.blobFile?.name}</p>
            </div>
            <div className="z-10">
              <button onClick={handleRemoveFile} className="text-[#f14e4e] hover:text-red-600" type="button">
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Uploader draggable fileListVisible={true} autoUpload={false} onChange={handleChangeImages} accept=".pdf">
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Click or drag a PDF file here to upload</span>
          </div>
        </Uploader>
      )}
    </div>
  );
};

export default AddTaxFileUpload;
