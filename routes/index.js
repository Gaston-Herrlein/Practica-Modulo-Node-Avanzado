const express = require("express");

const { Article } = require("../models");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { subtitle: "NodePOP & Express" });
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

//Url para ver articulos sin autenticacion
router.get("/articles", async (req, res, next) => {
  try {
    const articles = await Article.find();

    res.render("articles", { subtitle: "NodePOP & Express", articles });
  } catch (error) {
    next(error);
  }
});

//Url para ver formulario de crear articulo sin autenticacion
router.get("/new-article", async (req, res, next) => {
  try {
    const articles = await Article.find();

    res.render("newArticle");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
