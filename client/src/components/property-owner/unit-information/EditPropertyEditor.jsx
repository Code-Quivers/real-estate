/* eslint-disable no-unused-vars */
"use client";

import "react-quill/dist/quill.snow.css"; // Import Snow theme CSS (base theme)
import "react-quill/dist/quill.bubble.css"; // Import Bubble theme CSS
import { useMemo } from "react";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ size: ["small", "large"] }], // Only "normal" and "large" text sizes
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ],
};

const formats = ["bold", "italic", "underline", "strike", "indent", "list", "bullet", "size", "align"];

const EditPropertyEditor = ({ field, defaultValue }) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <div className="relative">
      <ReactQuill
        // {...field}
        // value={field ? field?.value : defaultValue}
        {...field}
        onChange={(value) => {
          field?.onChange(value);
        }}
        style={{ backgroundColor: "white", borderRadius: "0" }}
        className="w-full h-20 !rounded-none  !-z-10 focus:outline-none !border"
        modules={modules}
        formats={formats}
        theme="bubble"
      />
    </div>
  );
};

export default EditPropertyEditor;
