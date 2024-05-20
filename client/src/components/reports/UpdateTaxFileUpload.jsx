"use client";
import { Uploader, useToaster, Notification } from "rsuite";
import { useEffect, useState } from "react";
import { fileUrlKey } from "@/configs/envConfig";

const UpdateTaxFileUpload = ({ field, defaultValue }) => {
  const toaster = useToaster();
  const [currentFile, setCurrentFile] = useState(
    defaultValue?.documentFile
      ? {
          fileKey: defaultValue?.documentFile?.substring(14),
          name: defaultValue?.documentFile?.substring(14) || "File Name",
          url: `${fileUrlKey()}/${defaultValue?.documentFile}`,
          size: null, // Initially set size as null
        }
      : null,
  );
  //
  const handleChangeImages = (files) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1]; // Take the last file

      const fileSizeLimit = 1024 * 5 * 1024; // 5 MB

      if (latestFile.blobFile?.size && latestFile.blobFile?.size <= fileSizeLimit) {
        const fileType = latestFile.blobFile.type;
        // Check if the file is a PDF
        if (fileType === "application/pdf") {
          setCurrentFile(latestFile);
          field.onChange(latestFile);
          return; // Exit function after successful PDF file upload
        }
      }

      toaster.push(
        <Notification header="Error" type="error">
          <p className="text-sm">
            Please upload a PDF file <br /> within 5 MB.
          </p>
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );
      field.onChange(undefined);
      setCurrentFile(null);
    }
  };
  //
  const handleRemoveFile = () => {
    field.onChange(undefined);
    setCurrentFile(null);
  };
  //
  const formatFileSize = (bytes) => {
    if (bytes === undefined || bytes === null || isNaN(bytes)) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  // Fetch file size asynchronously
  useEffect(() => {
    if (defaultValue?.documentFile && !currentFile?.size && currentFile) {
      fetch(`${fileUrlKey()}/${defaultValue.documentFile}`)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((blob) => {
          setCurrentFile((prevFile) => ({
            ...prevFile,
            size: blob.size,
          }));
        })
        .catch((error) => {
          console.error("Error fetching file size:", error);
          setCurrentFile((prevFile) => ({
            ...prevFile,
            size: null,
          }));
        });
    }
  }, [defaultValue?.documentFile, currentFile?.size]);

  return (
    <div>
      {currentFile ? (
        <div className="mt-10">
          <div className="flex justify-between gap-5 items-start bg-slate-100 p-3">
            <div>
              <p className="text-wrap">{currentFile?.name}</p>
              <span className="text-xs">{formatFileSize(currentFile?.size || currentFile?.blobFile?.size)}</span>
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

export default UpdateTaxFileUpload;
