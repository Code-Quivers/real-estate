import multer from 'multer';

const userStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/user/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const propertyStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/property/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProfileImage = multer({ storage: userStorage });
const uploadPropertyImages = multer({ storage: propertyStorage });

export const FileUploadHelper = {
  uploadProfileImage,
  uploadPropertyImages,
};
