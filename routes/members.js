const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const bcrypt = require('bcrypt');

//creating routes to access the signup page
// router.get('/signup', (req, res, next) => {
//   res.render('auth/sign_up')
// })




//creating routes to access the login page
router.get('/login', (req, res, next) => {
  debugger
  console.log(req.url)
  res.render('auth/log_in')
})

router.post('/login', (req, res, next) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if(theEmail ===" " || thePassword ===" ") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to log in"
    });
    return;
  }
  Member.findOne({"email": theEmail})
    .then(member => {
      if (member) {
        bcrypt.comapare(thePassword, member.password, function(err, match) {
          if (err) throw new Error("Encryption error");
          if (match) {
            req.session.member = member; //creating the member session
            res.redirect("/members/profile");
          } else {
            res.send("Invalid credentials")
          }
        })
      } else {
        res.send("Invalid credentials")
      }
    })
    .catch((error) => {
      res.send("Error")
    })
});





module.exports = router;