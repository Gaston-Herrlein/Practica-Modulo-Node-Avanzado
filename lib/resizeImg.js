const jimp = require("jimp");

module.exports = async function resizeImg(img) {
  const urlImg = "./public/images/" + img;

  const image = await jimp.read(urlImg);

  // Redimenciono la imagen a 100px de ancho. El alto se escala automaticamente
  image.resize(100, jimp.AUTO);

  await image.writeAsync("./public/images/thumbnail/" + img);
};
