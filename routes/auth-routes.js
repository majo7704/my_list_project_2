const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// SIGNUP
router.get("/auth/signup", (req, res, next) => {
  res.render('auth/signup') //render does need a back slash 
})

  // name: String,
  //   email: String,
  //   password: String


router.post('/auth/signup', function(req, res, next){
  bcrypt.hash(req.body.password, 10, function(error, hash) {
    if(error) throw new Error("Encryption error");

    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }

    User.create(newUser)
    .then((user) => {
      req.session.user = user;
      res.redirect("/search");
    })
    .catch((err) => {
      res.send("error")
    })
  })
})

//LOGIN

router.get('/auth/login', (req, res, next) => {
  console.log(req.url)
  res.render('auth/login')
})

router.post('/auth/login', function(req, res, next) {
  User.findOne({email: req.body.email})
    .then((user) => {
      if(user) {
        bcrypt.compare(req.body.password, user.password, function(err, match){
          if(err) throw new Error("Encryption error");
          if(match) {
            req.session.user = user;
            res.redirect("/myGoals");
          }
        })
      } else {
        res.send("Invalid credentials")
      }
    })
    .catch((error) => {
      res.send("error")
    })
});
router.get("/logout", (req, res) =>{
  req.session.destroy(function (err) {
    if(err) return next(err)
    res.redirect('auth/login')
  });
  
})

module.exports = router;