"use client";
import { Uploader, Message, Loader, useToaster } from "rsuite";
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
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        const file = latestFile;
        const reader = new FileReader();
        // !
        const validBlobFiles = [];

        files?.forEach((filetype) => {
          if (
            filetype?.blobFile?.size &&
            filetype?.blobFile?.size <= fileSizeLimit
          ) {
            validBlobFiles.push(filetype?.blobFile);
          } else {
            toaster.push("File size exceeds 1MB.");
          }
        });

        dispatch(
          updateProperty({
            propertyId: property.id, // Assuming property.id is available in your props
            field: "images",
            value: validBlobFiles,
          }),
        );

        reader.readAsDataURL(file.blobFile);
      } else {
        toaster.push("File size exceeds 1MB.");
      }
    } else {
      //
    }
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item !== file);
    console.log(updatedFileList);

    // setFileList(updatedFileList);
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
      onSuccess={(response, file) => {
        toaster.push(<Message type="success">Uploaded successfully</Message>);
        console.log(response);
      }}
      onError={() => {
        setFileList([]);
        setUploading(false);
        toaster.push(<Message type="error">Upload failed</Message>);
      }}
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
