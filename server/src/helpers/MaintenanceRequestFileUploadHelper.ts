import multer from "multer";

const maintenanceRequestStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "data/uploads/maintenance-requests/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});
// const userStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "data/uploads/users/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueFilename = Date.now() + "-" + file.originalname;
//     cb(null, uniqueFilename);
//   },
// });

const uploadMaintenanceRequestImages = multer({ storage: maintenanceRequestStorage });

export const MaintenanceRequestFileUploadHelper = {
  uploadMaintenanceRequestImages,
};
