import { Uploader, Message, Loader, useToaster } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import { useState } from "react";
import { fileUrlKey } from "@/configs/envConfig";
import { RiDeleteBin5Fill } from "react-icons/ri";

const TenantPersonalProfileUpload = ({ field, defaultImage, setImagePreview, imagePreview, fileValue, setFileValue }) => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);

  const clearImagePreview = () => {
    if (defaultImage) setImagePreview(`${fileUrlKey()}/${defaultImage}`);
    if (!defaultImage) setImagePreview(undefined);
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

  return (
    <div>
      <div>
        <Uploader fileListVisible={false} listType="picture-text" autoUpload={false} onChange={handleChangeImages} onRemove={clearImagePreview}>
          <div style={{ width: 200, height: 200, borderRadius: "50%" }}>
            {uploading && <Loader backdrop center />}
            {imagePreview ? (
              <div>
                <img src={imagePreview} className="w-[200px] h-[200px] cursor-pointer rounded-xl object-cover " />
              </div>
            ) : (
              <div className="!border hover:border-black cursor-pointer focus-within:scale-105 rounded-xl    ">
                <AvatarIcon
                  style={{
                    width: 200,
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
            <div>
              <p className="text-wrap">{fileValue[0]?.blobFile?.name}</p>
            </div>
            <div className="z-10">
              <button onClick={handleRemoveFile} className="text-[#f14e4e] hover:text-red-600" type="button">
                <RiDeleteBin5Fill size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantPersonalProfileUpload;
