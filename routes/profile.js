 const express = require('express');
 const router = express.Router();
 const Goal = require('../models/Goal');
 
 



router.get("/myGoals", (req, res, next) => {
  if(req.session.under) {
    res.send(`Welcome to your profile page ${req.session.user.username}`)
  } else {
    res.redirect("/auth/login")
  } //render does need a back slash 
})



 module.exports = router;