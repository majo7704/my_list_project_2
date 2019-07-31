const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
require('dotenv').config()
const config = require('./config/database')
//const authenticate = require('./routes/oauth')
//require('./apiconfig/flickr');


const session = require('express-session');
const MongoStore = require("connect-mongo")(session)

const app = express();


app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 600000},
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  }),
  resave: false,
  saveUninitialized: true
}))
// Connection to database "myBucketList"
// mongoose.Promise = Promise
mongoose.connect(config.database, {useNewUrlParser: true})
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
hbs.registerHelper('ifunfinished', function (state, options) {
  if(state === 'unfinished'){
    return options.fn(this)
  }
  return options.inverse(this)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
  extended: false
}))

app.use(cookieParser());

let protectRoute = function(req, res, next){
  if(req.session.user) next();
  else res.redirect("/auth/login")
}

app.use(function (req, res, next) {
  if (req.session.user) res.locals.user = req.session.user;
  next();
})

app.use("/", require('./routes/index'));
app.use("/", require('./routes/auth-routes'));
app.use("/", protectRoute, require('./routes/search'));
app.use("/", protectRoute, require('./routes/profile'));
app.use("/", require('./routes/profile'));





app.use(function(req, res, next) {
  next({message: "Page not found.", status: 404})
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('errorMessage');
});
//const inspirations = require('./routes/inspirations')
//app.use('/', inspirations)







app.listen(3000, () =>{
  console.log('I am listening on 3000')
});

// module.exports = app;