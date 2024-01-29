import multer from "multer";

const propertyStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/property/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadPropertyImages = multer({ storage: propertyStorage });

export const PropertyFileUploadHelper = {
  uploadPropertyImages,
};
