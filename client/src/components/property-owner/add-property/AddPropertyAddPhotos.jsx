"use client";
import { Uploader, Loader, useToaster } from "rsuite";
import { VscDeviceCamera } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProperty } from "@/redux/features/propertyOwner/addPropertySlice";
import { useAppSelector } from "@/redux/hook";

const AddPropertyAddPhotos = ({ property }) => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  // Fetch files from Redux state when the component mounts
  const { propertyList } = useAppSelector((state) => state?.propertyList);

  const [fileList, setFileList] = useState(
    propertyList?.find((single) => single?.id === property?.id)?.files || [],
  );

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

      if (validBlobFiles.length > 0) {
        // Dispatch only the latest (last) valid file to the Redux store
        const latestValidFile = validBlobFiles[validBlobFiles.length - 1];
        dispatch(
          updateProperty({
            propertyId: property.id,
            field: "files",
            value: [latestValidFile],
          }),
        );
      }
    }
  };

  const handleRemove = (file) => {
    // Check if the file is being removed
    if (fileList.includes(file)) {
      const updatedFileList = fileList.filter((item) => item !== file);

      // Update the local state with the filtered file list
      setFileList(updatedFileList);

      // Dispatch the updated file list to the Redux store
      dispatch(
        updateProperty({
          propertyId: property.id,
          field: "files",
          value: updatedFileList,
        }),
      );
    }
  };

  const showUploadButton = fileList.length === 0;

  return (
    <Uploader
      fileList={fileList}
      listType="picture"
      autoUpload={false}
      onChange={handleChangeImages}
      onRemove={handleRemove}
      accept="image/*"
      action=""
    >
      <div className="flex  border-4 items-center justify-center">
        <button className=" ">
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
