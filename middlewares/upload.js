const multer = require("multer");
const Errors = require("http-errors");
// const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { filesize: 500000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }
    cb(new Errors.UnsupportedMediaType("Only images are allowed!"));
  },
});

module.exports = upload;
