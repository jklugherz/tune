var routes = require('./routes');
var auth = require('./auth');
const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

//passport
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var models = require('./models');
var User = models.User;
mongoose.connect(connect);


const app = express();

//handles sockets
const server = require('http').Server(app);

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport stuff
app.use(session({
  secret: 'this is a secret',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: 'http://localhost:3000/auth/login/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    var photo = profile.photos[0] ? profile.photos[0] : "/static/images/anonymous.jpeg";
    var username = profile.displayName ? profile.displayName : "Anonymous";
    User.findOrCreate({ spotifyId: profile.id }, {accessToken: accessToken, refreshToken:refreshToken}, {imageURL: photo, username: username }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.use('/', auth(passport));
app.use('/', routes);



server.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
