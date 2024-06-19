const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const createTransport = require("../config/emailTransportConfig");

const articleSchema = mongoose.Schema({
  name: { type: String, require: true, index: true },
  sale: { type: Boolean, require: true },
  price: { type: Number },
  photo: { type: String },
  tag: { type: [String] },
});

articleSchema.statics.listar = (filtro, skip, limit, sort, fields) => {
  const query = Article.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

articleSchema.methods.enviarEmail = async function (asunto, cuerpo) {
  const transport = await createTransport();

  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: process.env.TO_EMAIL,
    subject: asunto,
    text: cuerpo,
  });

  return result;
};

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
