import multer from "multer";

const propertyStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/conversations/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});

const uploadPropertyImages = multer({ storage: propertyStorage });

export const ConversationFileUploadHelper = {
  uploadPropertyImages,
};
