const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const articleRouter = require("./routes/api/article");
const authRouter = require("./routes/api/auth");
const authJWT = require("./lib/authMiddleware");

var app = express();

require("./lib/connect-mongose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
// app.use(
//   session({
//     name: "WalaPop-session",
//     secret: "sd7869f6789sfd8796sda87fsd978f768sdf8679s",
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1d - expiración de la sesión por inactividad
//     },
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URL,
//     }),
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/articles", authJWT, articleRouter);

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
