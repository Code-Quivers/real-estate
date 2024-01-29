"use client";
import { Uploader, Loader, useToaster } from "rsuite";
import { VscDeviceCamera } from "react-icons/vsc";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProperty } from "@/redux/features/propertyOwner/addPropertySlice";

const AddPropertyAddPhotos = ({ property }) => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  const handleChangeImages = (files) => {
    if (files.length > 0) {
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      const validBlobFiles = files
        .filter(
          (filetype) =>
            filetype?.blobFile?.size &&
            filetype?.blobFile?.size <= fileSizeLimit,
        )
        .map((filetype) => filetype.blobFile);

      dispatch(
        updateProperty({
          propertyId: property.id,
          field: "files",
          value: validBlobFiles,
        }),
      );
    } else {
      //
    }
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item !== file);
    setFileList(updatedFileList);
  };

  const showUploadButton = fileList.length === 0;

  return (
    <Uploader
      draggable={true}
      fileList={fileList}
      listType="picture"
      autoUpload={false}
      onChange={handleChangeImages}
      onRemove={(file) => handleRemove(file)}
      accept="image/*"
      action=""
    >
      <div className="flex border-4 items-center justify-center">
        <button>
          {uploading && <Loader backdrop center />}
          {!uploading && showUploadButton && (
            <span className="flex justify-center items-center">
              <VscDeviceCamera className="text-black" size={50} />
            </span>
          )}
        </button>
      </div>
    </Uploader>
  );
};

export default AddPropertyAddPhotos;
