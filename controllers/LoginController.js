const { User } = require("../models");
const jwt = require("jsonwebtoken");

class LoginController {
  index(req, res, next) {
    res.render("login");
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user || !(await user.comparePassword(password))) {
        res.locals.error = "Invalid credentials";
        res.locals.email = email;
        res.render("login");
        return;
      }

      const tokenJWT = await jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      res.json({ tokenJWT: tokenJWT });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
