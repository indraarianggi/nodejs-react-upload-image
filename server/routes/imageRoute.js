const express = require("express");
const multer = require("multer");
const ImageModel = require("../models/imageModel");

const router = express.Router();

// multer configuration to storing files to disk
const storage = multer.diskStorage({
  // directory where file being stored
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  // generate new name for file being uploaded
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

// filter file being uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

// configure multer middleware
const upload = multer({
  storage: storage,
  limits: {
    // limit file being uploaded
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/*
    stores image in uploads folder using multer
    and creates a reference to the file
*/

router.post("/uploadmulter", upload.single("imageData"), (req, res, next) => {
  console.log(req.body);

  const newImage = new ImageModel({
    imageName: req.body.imageName,
    imageData: req.file.path
  });

  newImage
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch(err => next(err));
});

module.exports = router;
