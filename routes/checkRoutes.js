const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../users");

const checkRoutes = express.Router();

checkRoutes.get("*", (req, res, next) => {
  checkRouteFn(req, res, next);
});

checkRoutes.post("*", (req, res, next) => {
  checkRouteFn(req, res, next);
});

function checkRouteFn(req, res, next) {
  console.log("here");
  console.log(req.headers);
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);

  if (!authorizationHeader) res.status(401).send("Token have not found");

  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, "secretKey", (err, result) => {
    if (err) res.status(403).send("invalid token");
    const id = result.id;
    const user =
      users.find((item) => {
        return item.id == id;
      }) || null;
    if (!user) res.status(403).send("User have not found");
    req.user = user;
    console.log("end of checkRoute");
    next();
  });
}

module.exports = {
  checkRoutes,
};
