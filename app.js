const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const i18n = require("./lib/i18nConfig");

const indexRouter = require("./routes/index");
const articleRouter = require("./routes/api/article");
const authRouter = require("./routes/api/auth");
const localeRouter = require("./routes/locale");
const authJWT = require("./lib/authMiddleware");

var app = express();

require("./lib/connect-mongose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(i18n.init);
app.use("/", indexRouter);
app.use("/change-locale", localeRouter);
app.use("/api/auth", authRouter);
app.use("/api/articles", authJWT, articleRouter);
//In case it does not match the endpoints above, redirect to index
app.use("/api", (req, res, next) => {
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
