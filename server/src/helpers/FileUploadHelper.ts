import multer from "multer";
import path from "path";
import { NextFunction, Request, Response } from "express";

const propertyStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/property/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
const userStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/users/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
const uploadProfileImage = multer({ storage: userStorage });

// ! update profile image
const uploadUpdatedUserImage = multer({
  storage: userStorage,
  limits: {
    fileSize: 512 * 2 * 1024, // 1MB
  },
  fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype); // verify file is == filetypes will accept
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(), // extract the file extension and convert to lowercase
    );
    // if mimetype && extreme are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }
    // if mimetype or extname false, it will show an error of compatibility
    return cb(new Error("Only jpeg, jpg and png file will be accepted !!"));
  },
});
const uploadPropertyImages = multer({ storage: propertyStorage });

type fieldType = {
  name: string;
  maxCount: number;
};
// const uploadPropertyImages = multer({ storage: propertyStorage });
const uploadPropertyImages2 = (req: Request, res: Response, next: NextFunction) => {
  const keys = Object.keys([]);
  const fields: fieldType[] | any = [];
  keys.forEach((item) => {
    fields.append({ name: item, maxCount: 8 });
  });
  const upload = multer({ storage: propertyStorage });
  const cpUpload = upload.fields(fields);

  return cpUpload;
};

export const FileUploadHelper = {
  uploadProfileImage,
  uploadPropertyImages,
  uploadUpdatedUserImage,
  uploadPropertyImages2,
};
