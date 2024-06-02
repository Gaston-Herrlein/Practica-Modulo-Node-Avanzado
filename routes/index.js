const express = require("express");

const { Article } = require("../models");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { subtitle: "NodePOP with Express" });
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

    res.render("articles", { subtitle: "NodePOP with Express", articles });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
