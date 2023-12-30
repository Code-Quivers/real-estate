"use client";
import { Uploader, Message, Loader, useToaster } from "rsuite";
import { VscDeviceCamera } from "react-icons/vsc";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddPropertyAddPhotos = ({ property }) => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const handleChangeImages = (files) => {
    console.log(files);

    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        const file = latestFile;
        const reader = new FileReader();

        reader.readAsDataURL(file.blobFile);
      } else {
        toaster.error("File size exceeds 1MB.");
      }
    } else {
      //
    }
  };
  const handleRemove = () => {
    setFileList([]);
  };

  const showUploadButton = fileList.length === 0;

  return (
    <Uploader
      fileList={fileList}
      listType="picture"
      autoUpload={false}
      onChange={handleChangeImages}
      onRemove={handleRemove}
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
      <button>
        {uploading && <Loader backdrop center />}
        {!uploading && showUploadButton && (
          <span>
            <VscDeviceCamera className="text-black" size={50} />
          </span>
        )}
      </button>
    </Uploader>
  );
};

export default AddPropertyAddPhotos;
