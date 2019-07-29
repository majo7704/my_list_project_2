const express = require('express');
const router = express.Router();


router.get('/search', (req, res, next) => {
  res.render('searchGoals.hbs')
})

module.exports = router;