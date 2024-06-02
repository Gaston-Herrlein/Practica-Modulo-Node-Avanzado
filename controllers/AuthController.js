const createError = require("http-errors");

const { Article, User } = require("../models");

class AuthController {
  async index(req, res, next) {
    try {
      const userId = req.session.userId;

      const user = await User.findById(userId);

      if (!user) {
        next(createError(500, "User not found"));
        return;
      }

      const article = await Article.findAll();

      res.redirect("/api/articles", { articles: article });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
