"use client"; // UpdateImageUpload.jsx
import { Uploader, Button } from "rsuite";
import { Controller } from "react-hook-form";
import { fileUrlKey } from "@/configs/envConfig";
import { useState } from "react";

const UpdateImageUpload = ({ control, setValue, images }) => {
  const [defaultFileList, setDefaultFileList] = useState(
    images?.map((image, index) => ({
      fileKey: `default-${index + 1}`,
      name: `Image ${index + 1}`,
      url: `${fileUrlKey()}/${image}`,
    })) || [],
  );

  const handleRemove = (file) => {
    // Remove the file from the defaultFileList
    // const updatedDefaultFileList = defaultFileList.filter((item) => item.fileKey !== file.fileKey).map((item) => ({ ...item }));

    // // Update the defaultFileList
    // setDefaultFileList(updatedDefaultFileList);

    // // Remove the file from the "files" field in the React Hook Form
    // setValue("files", updatedDefaultFileList);
    console.log(file);

    if (file.fileKey.startsWith("default-")) {
      // Remove the file from the defaultFileList
      const updatedDefaultFileList = defaultFileList.filter((item) => item.fileKey !== file.fileKey);

      // Update the defaultFileList
      setDefaultFileList(updatedDefaultFileList);

      // Remove the file from the "files" field in the React Hook Form
      setValue("files", updatedDefaultFileList);
    } else {
      // Handle the removal of selected files
      const updatedSelectedFiles = defaultFileList.filter((item) => {
        console.log("item", item.fileKey);
        console.log("file", file.fileKey);
        return item.fileKey !== file.fileKey;
      });
      console.log(updatedSelectedFiles);
      console.log(updatedSelectedFiles, "selected");
      // Update the "files" field in the React Hook Form
      setValue("files", updatedSelectedFiles);

      // Update the defaultFileList
      setDefaultFileList(updatedSelectedFiles);
    }
  };
  const handleChangeImages = (files) => {
    if (files.length > 0) {
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      // Check if any file is from the new selected files
      const isNewSelected = files.some((file) => defaultFileList.every((defaultFile) => defaultFile.url !== file.url));
      if (isNewSelected) {
        console.log("is new selected");
        const validBlobFiles = files
          .filter((filetype) => filetype?.blobFile?.size && filetype?.blobFile?.size <= fileSizeLimit)
          .map((filetype, index) => ({
            blobFile: filetype.blobFile,
            fileKey: `selected-${index + 1}`,
            name: filetype.blobFile.name,
            status: "inited", // You might want to set an appropriate status
          }));

        // Update the defaultFileList with new and valid files
        const updatedDefaultFileList = [...defaultFileList.filter((file) => !file.fileKey.startsWith("selected")), ...validBlobFiles];

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
          listType="picture"
          autoUpload={false}
          onChange={handleChangeImages}
          accept="image/*"
          action=""
        >
          <div className="flex items-center justify-center">
            <Button>Select</Button>
          </div>
        </Uploader>
      )}
    />
  );
};

export default UpdateImageUpload;
