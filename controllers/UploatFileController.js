const multer = require("multer");

// const resizeImg = require("../lib/resizeImg");
const publisherResize = require("../lib/publisherResize.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: async function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    //Guardo el nombre del archivo en el body de la peticion
    req.body.photo = name;

    await cb(null, name);
    // resizeImg(name);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("photo");

exports.publish = (req, res, next) => {
  publisherResize(req.body.photo);
  next();
  // res.send({ data: "Imagen recibida" });
};
