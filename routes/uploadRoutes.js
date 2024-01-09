const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadVideo } = require("../controller/upload");
require('dotenv').config();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed."), false);
  }
};

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage,fileFilter });

router.post("/", upload.single("file"),uploadVideo);



module.exports = router;