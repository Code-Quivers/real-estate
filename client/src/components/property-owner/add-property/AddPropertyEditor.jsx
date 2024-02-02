"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: ["small", true, "large", "huge"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["list", "bullet", "indent", "size"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "indent",
  "list",
  "bullet",
  "size",
  "align",
];

const MyComponent = ({ propertyId, value, handleInputChange, field }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <div className="relative">
      <ReactQuill
        style={{ backgroundColor: "white", borderRadius: "0" }}
        className="w-full h-32 max-h-[150px] !rounded-none focus:outline-none"
        value={value}
        onChange={(e) => handleInputChange(propertyId, field, e)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default MyComponent;
