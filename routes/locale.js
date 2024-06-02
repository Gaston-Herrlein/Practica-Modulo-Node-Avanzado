const express = require("express");
const router = express.Router();

const LangController = require("../controllers/LangController");
const langController = new LangController();

router.get("/:locale", langController.changeLocale);

module.exports = router;
