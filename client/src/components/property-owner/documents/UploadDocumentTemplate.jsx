"use client";
import { Uploader, Message, useToaster } from "rsuite";

const UploadDocumentTemplate = ({ field }) => {
  const toaster = useToaster();

  const handleChangeImages = (files) => {
    if (files.length > 0) {
      // Take only the first file if multiple files are somehow selected
      const latestFile = files[files?.length - 1]; // Corrected to use the last file

      console.log(files);

      const fileSizeLimit = 1024 * 5 * 1024; // 5 MB

      if (latestFile.blobFile?.size <= fileSizeLimit) {
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

  const formatFileSize = (bytes) => {
    if (bytes === undefined || bytes === null || isNaN(bytes)) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      {field?.value ? (
        <div className="mt-10">
          <div className="flex justify-between gap-5 items-start bg-slate-100 p-3 ">
            <div>
              <p className="text-wrap">{field?.value?.blobFile?.name}</p>
              <span className="text-xs ">{formatFileSize(field?.value?.blobFile?.size)}</span>
            </div>
            <div className="z-10">
              <button onClick={handleRemoveFile} className="text-[#f14e4e] hover:text-red-600" type="button">
                Remove File
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Uploader fileListVisible={false} draggable autoUpload={false} onChange={handleChangeImages} accept=".pdf">
          <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Click or drag a PDF file here to upload</span>
          </div>
        </Uploader>
      )}
    </div>
  );
};

export default UploadDocumentTemplate;
