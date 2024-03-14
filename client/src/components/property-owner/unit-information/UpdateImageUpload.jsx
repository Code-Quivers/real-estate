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


  const handleChangeImages = (files) => {
    if (files.length > 0) {
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB
      console.log(files, 'handleOnChanges')
       // Update the "files" field in the React Hook Form
       setValue("files", files);

       // Update the defaultFileList
       setDefaultFileList(files);
    }
  };

  return (
    <Controller
      name="files"
      control={control}
      render={({ field }) => (
        <Uploader
          {...field}
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
