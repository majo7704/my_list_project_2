const express = require('express');
const app = express();
const Flickr = require('flickr-sdk');

const flickr = new Flickr(process.env.FLICKR_API_KEY)

app.get('/search', (req, res) => {
  
  flickr.photos.search({
    text: 'doggo'
  }).then(function (res) {
    res.render('populatedGoals', {goal})
    console.log('yay!', res.body);
  }).catch(function (err) {
    console.error('bonk', err);
  });

})
module.exports = app;



// const express = require('express');
// const router = express.Router();


// router.get('/search', (req, res, next) => {
//   res.render('searchGoals.hbs')
// })

// module.exports = router;