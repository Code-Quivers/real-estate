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
        className="w-full h-32 !rounded-none focus:outline-none !border"
        value={value}
        onChange={(e) => handleInputChange(propertyId, field, e)}
        modules={modules}
        formats={formats}
        theme="bubble" // Set the theme to "bubble"
      />
    </div>
  );
};

export default MyComponent;
