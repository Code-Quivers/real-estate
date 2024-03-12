"use client";

import "react-quill/dist/quill.snow.css"; // Import Snow theme CSS (base theme)
import "react-quill/dist/quill.bubble.css"; // Import Bubble theme CSS
import { useMemo } from "react";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: ["small", true, "large", "huge"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ],
};

const formats = ["bold", "italic", "underline", "strike", "indent", "list", "bullet", "size", "align"];

const EditPropertyEditor = ({ defaultValue, field }) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  // Convert HTML to Delta

  return (
    <div className="relative">
      <ReactQuill
        {...field}
        defaultValue={defaultValue}
        style={{ backgroundColor: "white", borderRadius: "0" }}
        className="w-full h-20 !rounded-none focus:outline-none !border"
        modules={modules}
        formats={formats}
        theme="bubble"
      />
    </div>
  );
};

export default EditPropertyEditor;
