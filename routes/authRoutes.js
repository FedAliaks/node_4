const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../users");

const authRoutes = express.Router();

authRoutes.post("/register", (req, res) => {
    console.log('here')
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) res.status(400).send("error");
    console.log(users);
    const newUser = {
      id: users.length + 1,
      email: email,
      password: hash,
      super: false,
    };

    users.push(newUser);
    console.log(users);
    res.status(201).send("New user created");
  });
});

authRoutes.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  let user = users.find((item) => item.email == email) || null;
  if (!user) res.status(400).send("User have not found");
  hash = user.password;

  bcrypt.compare(password, hash, (err, result) => {
    if (result) {
      jwt.sign(
        { id: user.id, email: email },
        "secretKey",
        { expiresIn: "5m" },
        (err, token) => {
          if (err) res.status(400).send("Error");
          console.log(token);
          res.status(200).send(token);
        },
      );
    } else {
      res.status(400).send("password incorrect");
    }
  });
});

module.exports = {
  authRoutes,
};
