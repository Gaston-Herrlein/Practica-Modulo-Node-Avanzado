const mongoose = require("mongoose");

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

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
