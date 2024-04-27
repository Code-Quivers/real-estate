/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import path from "path";

const taxDocumentStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/tax-documents/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});

const pdfFilter = (req: any, file: any, cb: any) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (fileExt === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const uploadTaxDocumentPdf = multer({
  storage: taxDocumentStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

export const TaxDocumentFileUploadHelper = {
  uploadTaxDocumentPdf,
};
