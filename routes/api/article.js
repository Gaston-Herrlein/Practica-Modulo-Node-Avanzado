var express = require("express");

const { Article } = require("../../models");
const uploadFile = require("../../controllers/UploatFileController");

var router = express.Router();

// GET /api/article
// http://localhost:3000/api/articles?start=1&limit=3&sort=name&tag=lifestyle
router.get("/", async (req, res, next) => {
  try {
    // filter
    const filterByName = req.query.name;
    const filterByTag = req.query.tag;
    // pagination
    const { start } = req.query;
    const { limit } = req.query;
    // order
    const { sort } = req.query;
    // field selection
    const { fields } = req.query;

    const filter = {};

    if (filterByName) {
      filter.name = filterByName;
    }

    if (filterByTag) {
      filter.tag = filterByTag;
    }

    const articles = await Article.listar(filter, start, limit, sort, fields);

    res.render("articles", { subtitle: "NodePOP with Express", articles });
  } catch (error) {
    next(error);
  }
});

// GET /api/articles/tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = await Article.find({}).distinct("tag");
    res.render("tags", { subtitle: "NodePOP & Express", tags });
  } catch (error) {
    next(error);
  }
});

// GET /api/articles/<_id>
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.json({ result: article });
  } catch (error) {
    next(error);
  }
});

// POST /api/articles
router.post(
  "/",
  uploadFile.upload,
  uploadFile.publish,
  async (req, res, next) => {
    try {
      const data = req.body;
      const article = new Article(data);
      const articleGuardado = await article.save();

      res.json({ result: articleGuardado });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/articles/<_id>
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const articleActualizado = await Article.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({ result: articleActualizado });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/articles/<_id>
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Article.deleteOne({ _id: id });

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
