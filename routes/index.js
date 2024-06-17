const express = require("express");

const { Article } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { subtitle: "NodePOP & Express" });
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

//Endpoint to view articles without auth
router.get("/articles", async (req, res, next) => {
  try {
    const articles = await Article.find();

    res.render("articles", { subtitle: "NodePOP & Express", articles });
  } catch (error) {
    next(error);
  }
});

//Endpoint to create article form without auth
router.get("/new-article", async (req, res, next) => {
  try {
    const articles = await Article.find();

    res.render("newArticle");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
