"use client";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Uploader } from "rsuite";

const AddPropertyUploadPhotos = ({ field, propertyId }) => {
  console.log("Shafin", propertyId);
  const [fileValue, setFileValue] = useState([]);

  const handleChangeImages = (files) => {
    const modifiedFiles = files.map((file) => {
      const modifiedFile = new File([file.blobFile], `${propertyId}_${file.name}`, {
        type: file.blobFile.type,
        lastModified: file.blobFile.lastModified,
      });
      return modifiedFile;
    });

    setFileValue(files);
    field.onChange(modifiedFiles);
  };

  return (
    <div>
      <Uploader
        style={{
          display: "flex",
          flexDirection: "column-reverse",
        }}
        listType="picture"
        fileList={fileValue}
        onChange={handleChangeImages}
        autoUpload={false}
        draggable
        multiple
        as={"div"}
        action={""}
        accept="image/*"
      >
        <div
          style={{
            padding: "20px",
            paddingBottom: "30px",
            paddingTop: "30px",
            width: "100%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IoCloudUploadOutline size={30} />
          <p className="text-[#2563eb] underline font-medium ">
            Click to upload <span>or</span>
          </p>
          <p>drag and drop</p>
        </div>
      </Uploader>
    </div>
  );
};

export default AddPropertyUploadPhotos;
