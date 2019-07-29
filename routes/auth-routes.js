const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


router.get("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
});

if (username ===" " || password === " ") {
  res.render("auth/signup", { message: "The username already exists"});
  return;
}

const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(password, salt)

newUser.save((err) => {
  if (err) {
    res.render("auth/signup", { message: "Something went wrong"});
  } else {
    res.redirect('/');
  }
})
.catch(error => {
  next(error)
})
