"use client";
import { Message, Uploader, useToaster } from "rsuite";
import { VscDeviceCamera } from "react-icons/vsc";

const AddMaintenanceReqPhotos = ({ field }) => {
  const toaster = useToaster();
  const handleChangeImages = (files) => {
    if (files.length > 0) {
      const fileSizeLimit = 512 * 20 * 1024; // 20 Mb
      const validBlobFiles = files
        .filter((filetype) => filetype?.blobFile?.size && filetype?.blobFile?.size <= fileSizeLimit)
        .map((filetype) => filetype.blobFile);

      if (validBlobFiles.length > 0) {
        field.onChange(validBlobFiles);
      } else {
        toaster.push(
          <Message centered showIcon type="error" closable>
            Maximum file size is 20 MB
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          },
        );
      }
    }
  };

  return (
    <Uploader multiple={true} as="div" listType="picture" autoUpload={false} onChange={handleChangeImages} accept="image/*" action="">
      <div className="flex  border-4 items-center justify-center">
        <button type="button">
          <span className="flex justify-center items-center">
            <VscDeviceCamera className="text-black" size={50} />
          </span>
        </button>
      </div>
    </Uploader>
  );
};

export default AddMaintenanceReqPhotos;
