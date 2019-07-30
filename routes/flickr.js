const express = require('express');
const router = express.Router();

// const Flickr = require('flickrapi'),
//   flickrOptions = {
//     api_key: "0dd0a813895fcf147f9d80291a203c0a",
//     secret: "b128d960e1834800",
//     requestOptions: {
//       timeout: 20000
//     }
//   };
// Flickr.authenticate(flickrOptions, function(error, flickr) {

// })

const flickrApi = new Flickr ({
  clientId: clientId,
  clientScret: clientSecret
});

router.get('/search', (req, res, next)=>{
  flickrApi.getPhotos()
    .then((photos) => {
      console.log(photos)
    })
    .catch(err => {
      console.log('error' + err)
    })
})

module.exports = router;