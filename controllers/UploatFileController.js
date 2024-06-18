const multer = require("multer");

const publisherResize = require("../service/publisher/publisherResize.js");
const publisherEmail = require("../service/publisher/publisherEmail.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: async function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    //Save the file name in the body of the request
    req.body.photo = name;

    await cb(null, name);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("photo");

exports.publish = (req, res, next) => {
  publisherResize(req.body.photo);
  publisherEmail(req.body.photo);
  next();
};
