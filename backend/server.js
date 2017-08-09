var routes = require('./routes');
var auth = require('./auth');
const express = require( 'express' );
var bodyParser = require( 'body-parser' );

//passport
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var models = require('./models');
var User = models.User;

const app = express();


//handles sockets
const server = require('http').Server(app);

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

var session = require('express-session');
app.use(session({ secret: 'this is a secret' }));

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
    callbackURL: process.env.SPOTIFY_REDIRECT_URI
  },
  function(accessToken, refreshToken, profile, cb) {
    // var photo = profile.photos[0] ? profile.photos[0] : "/static/images/anonymous.jpeg";
    var username = profile.displayName ? profile.displayName : "Anonymous";
    User.findOrCreate({ spotifyId: profile.id }, {accessToken: accessToken, refreshToken:refreshToken, username: username }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes);



server.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
