const express = require('express');
const app = express();
const Flickr = require('flickr-sdk');

var flickr = new Flickr(Flickr.OAuth.createPlugin(
  process.env.FLICKR_CONSUMER_KEY,
  process.env.FLICKR_CONSUMER_SECRET,
  process.env.FLICKR_OAUTH_TOKEN,
  process.env.FLICKR_OAUTH_TOKEN_SECRET
));


app.get('/testlogin', (req, res) => {
  
  flickr.test.login().then(function (res) {
    
    console.log('yay!', res.body);
  }).catch(function (err) {
    console.error('bonk', err);
  });
})




module.exports = app;