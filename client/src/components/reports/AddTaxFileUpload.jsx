"use client";

import { Uploader } from "rsuite";

const AddTaxFileUpload = ({ field }) => {
  return (
    <div>
      <Uploader
        multiple={false}
        size="lg"
        action=""
        onChange={(e) => {
          field.onChange(e);
        }}
        autoUpload={false}
        draggable
      >
        <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>Click or Drag files to this area to upload</span>
        </div>
      </Uploader>
    </div>
  );
};

export default AddTaxFileUpload;

{
  /* if report type is annual or monthly */
}
