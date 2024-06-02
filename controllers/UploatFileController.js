const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    console.log(req.body);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("photo");

exports.uploadFile = (req, res) => {
  res.send({ data: "enviar un archivo" });
};
