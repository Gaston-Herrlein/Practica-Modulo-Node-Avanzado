const jimp = require("jimp");

module.exports = async function resizeImg(img) {
  const urlImg = "./public/images/" + img;
  const image = await jimp.read(urlImg);
  // I resize the image to 100px width. The height is automatically scaled
  image.resize(100, jimp.AUTO);

  await image.writeAsync("./public/images/thumbnail/" + img);
};
