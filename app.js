const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
//const instaFeed = require('instafeed.js');

const session = require('express-session');
const MongoStore = require("connect-mongo")(session)

const app = express();

app.get('/', (req, res, next) => {
  console.log(req.url)
res.render('home')
})



app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 60000},
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60
  }),
  resave: false,
  saveUninitialized: true
}))
// Connection to database "myBucketList"
mongoose.connect('mongodb://localhost/myBucketList', {useNewUrlParser: true})
    .then(() => {
    console.log('Connected to Mongo');
  }).catch(err => {
    console.log('Error connecting to mongo', err);
  });

// Middlewear set up
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
  extended: false
}))
//app.use('/', require("./routes/inspirations"))
app.use("/login", require("./routes/members"))

app.use(cookieParser);




//const inspirations = require('./routes/inspirations')
//app.use('/', inspirations)







app.listen(3000, () =>{
  console.log('I am listening on 3000')
});