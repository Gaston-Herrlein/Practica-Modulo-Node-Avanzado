const multer = require("multer");

const resizeImg = require("../lib/resizeImg");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
    resizeImg(name);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("photo");

exports.uploadFile = (req, res) => {
  res.send({ data: "Imagen recibida" });
};
