import { Uploader, Message, Loader, useToaster } from "rsuite";
import { LuUploadCloud } from "react-icons/lu";
import { useState } from "react";
import { fileUrlKey } from "@/configs/envConfig";
import { RiDeleteBin5Fill } from "react-icons/ri";

const PropertyOwnerUploadImageEdit = ({ field, defaultImage }) => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileValue, setFileValue] = useState([]);
  const [imagePreview, setImagePreview] = useState(fileValue?.length ? null : defaultImage ? `${fileUrlKey()}/${defaultImage}` : null);

  const clearImagePreview = () => {
    setImagePreview(`${fileUrlKey()}/${defaultImage}` || undefined);
    field.onChange(undefined);
    setFileValue([]);
  };

  const handleChangeImages = (files) => {
    if (files.length > 0) {
      setUploading(true);

      clearImagePreview();
      // Take only the first file if multiple files are somehow selected
      const latestFile = files[files.length - 1];

      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      if (latestFile.blobFile?.size && latestFile.blobFile?.size <= fileSizeLimit) {
        // Clear previous file information

        // Update the fileValue state to contain only the new file
        setFileValue([latestFile]);

        field.onChange(latestFile);

        const file = latestFile;
        const reader = new FileReader();

        reader.onload = (e) => {
          const imagePreviewUrl = e.target?.result;
          setImagePreview(imagePreviewUrl);
        };

        reader.readAsDataURL(file.blobFile);
        setUploading(false);
      } else {
        clearImagePreview();
        setUploading(false);
        toaster.push(<Message type="error">Image exceed 1 MB</Message>);
      }
    } else {
      setUploading(false);
      clearImagePreview();
    }
  };

  const handleRemoveFile = () => {
    // Handle the removal of the file here
    clearImagePreview();
    // Additional logic for file removal if needed
  };
  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };
  return (
    <div className="lg:flex gap-10 items-center">
      <div>
        <Uploader
          fileListVisible={false}
          listType="picture-text"
          autoUpload={false}
          accept="image/jpeg,image/png"
          onChange={handleChangeImages}
          onRemove={clearImagePreview}
        >
          <div style={{ width: 200, height: 200, borderRadius: "50%" }}>
            {uploading && <Loader backdrop center />}
            {imagePreview ? (
              <div>
                <img src={imagePreview} className="w-[200px] h-[200px] rounded-full object-cover " />
              </div>
            ) : (
              <div className="!border hover:border-[#545454] focus-within:scale-105 rounded-full overflow-hidden flex justify-center  ">
                <LuUploadCloud
                  color="#545454"
                  style={{
                    width: 100,
                    height: 200,
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </div>
        </Uploader>
      </div>
      {/*  */}
      <div className="mt-10">
        {fileValue?.length > 0 && (
          <div className=" flex justify-between gap-5 items-center">
            <p className="text-wrap ">
              {fileValue[0]?.blobFile?.name} - <span className="font-medium">{formatFileSize(fileValue[0]?.blobFile?.size)}</span>
            </p>
            <button onClick={handleRemoveFile} className="text-[#f14e4e] hover:text-red-600" type="button">
              <RiDeleteBin5Fill size={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyOwnerUploadImageEdit;
