const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = function authJWT(req, res, next) {
  const tokenJWT = req.get("Authorization") || req.body.jwt || req.query.jwt;

  if (!tokenJWT) {
    next(createError(401, "no token provided"));
    return;
  }

  jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      next(createError(401, "invalid token"));
      return;
    }

    req.apiUserId = payload.userId;
    next();
  });
};
