var express = require("express");
var router = express.Router();

const LoginController = require("../../controllers/LoginController");

const loginController = new LoginController();

// const AuthController = require("../../controllers/AuthController");
// const authController = new AuthController();

// router.get("/", authController.index);

router.post("/", loginController.post);

module.exports = router;
