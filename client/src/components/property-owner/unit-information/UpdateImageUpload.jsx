/* eslint-disable prefer-const */
"use client"; // UpdateImageUpload.jsx
import { Uploader, Button } from "rsuite";
import { Controller } from "react-hook-form";
import { fileUrlKey } from "@/configs/envConfig";
import { useState } from "react";

const UpdateImageUpload = ({ control, setValue, images }) => {
  let [defaultFileList, setDefaultFileList] = useState(
    images?.map((image, index) => ({
      fileKey: `default-${index + 1}`,
      name: `Image ${index + 1}`,
      url: `${fileUrlKey()}/${image}`,
    })) || [],
  );

  const handleRemove = (file) => {
    console.log("Removing file:", file);

    if (file.fileKey.startsWith("default-")) {
      // Remove the file from the defaultFileList
      const updatedDefaultFileList = defaultFileList.filter((item) => item.fileKey !== file.fileKey);

      // Update the defaultFileList
      setDefaultFileList(updatedDefaultFileList);

      // Remove the file from the "files" field in the React Hook Form
      setValue("files", updatedDefaultFileList);
    } else if (!file.fileKey.startsWith("default-")) {
      // Handle the removal of selected files
      const updatedSelectedFiles = defaultFileList.filter((item) => item.fileKey !== file.fileKey);

      // Update the "files" field in the React Hook Form
      setValue("files", updatedSelectedFiles);

      // Update the defaultFileList
      setDefaultFileList(updatedSelectedFiles);
    }
  };

  const handleChangeImages = (files) => {
    if (files.length > 0) {
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      // Check if any file is not from the existing selected file list
      const isNotFromSelected = files.some(
        (file) => !defaultFileList.some((defaultFile) => defaultFile.fileKey.startsWith("selected") && defaultFile.url === file.url),
      );

      if (isNotFromSelected) {
        // Filter and map validBlobFiles
        const validBlobFiles = files
          .filter((filetype) => filetype?.blobFile?.size && filetype?.blobFile?.size <= fileSizeLimit)
          .map((filetype, index) => ({
            blobFile: filetype.blobFile,
            fileKey: `selected-${new Date().getTime()}-${index + 1}`, // Use a unique key
            name: filetype.blobFile.name,
            status: "inited",
          }));

        // Update the defaultFileList with new and valid files
        const updatedDefaultFileList = [...defaultFileList, ...validBlobFiles];

        // Update the "files" field in the React Hook Form
        setValue("files", updatedDefaultFileList);

        // Update the defaultFileList
        setDefaultFileList(updatedDefaultFileList);
      }
    }
  };

  return (
    <Controller
      name="files"
      control={control}
      render={({ field }) => (
        <Uploader
          {...field}
          onRemove={handleRemove}
          defaultFileList={defaultFileList}
          listType="picture-text"
          autoUpload={false}
          onChange={handleChangeImages}
          accept="image/*"
          action=""
        >
          <div className="flex items-center justify-center">
            <Button>Select files...</Button>
          </div>
        </Uploader>
      )}
    />
  );
};

export default UpdateImageUpload;
