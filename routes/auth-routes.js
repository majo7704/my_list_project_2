const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// SIGNUP
router.get("/auth/signup", (req, res, next) => {
  res.render('auth/signup') //render does need a back slash 
})

router.post('/auth/signup', function(req, res, next){
  bcrypt.hash(req.body.password, 10, function(error, hash) {
    if(error) throw new Error("Encryption error");

    let newUser = {
      username: req.body.username,
      password: hash
    }

    User.create(newUser)
    .then((user) => {
      res.redirect('/auth/login');// remember that redirect needs a back slash
    })
    .catch((err) => {
      res.send("error")
    })
  })
})

//LOGIN
// router.get('/auth/login', etc)
// })
router.get('/auth/login', (req, res, next) => {
  console.log(req.url)
  res.render('auth/login')
})
router.post('/auth/login', function(req, res, next) {
  User.findOne({username: req.body.username})
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


module.exports = router;