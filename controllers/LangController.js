class LangController {
  changeLocale(req, res, next) {
    const locale = req.params.locale;

    res.cookie("NodePop-locale", locale, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    });

    res.redirect("back");
  }
}

module.exports = LangController;
