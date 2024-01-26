import multer from "multer";

const propertyStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("Destination Callback - File Destination:", "data/uploads/property/");
    callback(null, "data/uploads/property/");
  },
  filename: function (req, file, cb) {
    console.log("Filename Callback - Original Filename:", file.originalname);
    cb(null, file.originalname);
  },
});

const uploadPropertyImages = multer({ storage: propertyStorage });

export const PropertyFileUploadHelper = {
  uploadPropertyImages,
};
