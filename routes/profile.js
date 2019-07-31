 const express = require('express');
 const router = express.Router();
 const Goal = require('../models/Goal');
 const User = require('../models/User');



router.get("/myGoals", (req, res, next) => {
  if(!req.query.server) {
      User.findById(req.session.user._id)
        .populate("goals")
        .populate("completedGoals")
        .then(user => {
          res.render("myGoals", {
            user
          })
        })
        .catch(err => console.log(err))
  } else {
    let newGoal = {
      server: req.query.server,
      idApi: req.query.idApi,
      secret: req.query.secret,
      state: "unfinished",
      title: req.query.title
    }
    Goal.create(newGoal)
      .then((response) => {
        
        return User.findByIdAndUpdate(req.session.user._id, { $push: { goals: response._id }}, { new: true })
        .populate("goals")
        .populate("completedGoals")
      })
      .then((user) => {
        
        res.render("myGoals", { user })
      })
      .catch(err => console.log(err))
  }
})

router.get("/create", (req, res, next) =>{
  redirect("create_goal")
})

router.get('/removedGoal', (req, res, next)=>{
  if (req.query.state === 'completed') {
  User.findByIdAndUpdate(req.session.user._id, {$pull: {completedGoals: req.query.id}})
  .then(() =>{
    res.redirect("/myGoals")
  })
  .catch(err => console.log(err)) 
} else {
  User.findByIdAndUpdate(req.session.user._id, {$pull: {goals: req.query.id}})
    .then(() => {
      res.redirect("/myGoals")
    })
    .catch(err => console.log(err))
}
})

router.get('/completedGoal', (req, res, next)=> {
  User.findByIdAndUpdate(req.session.user._id, {$pull: {goals: req.query.id},
  $push: {completedGoals: req.query.id}})
  .then(() => {
    return Goal.findByIdAndUpdate(req.query.id, {state: "complete"}, {new: true})
  })
  .then(() => {
    res.redirect("/myGoals")
  })
  .catch(err => console.log(err))
})

 module.exports = router;