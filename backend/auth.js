var express = require('express');
var router = express.Router();
var models = require('./models');
var User = models.User;

module.exports = function(passport) {

  router.get('/auth/login',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] }));

  router.get('/auth/login/callback',
    passport.authenticate('spotify', { failureRedirect: '/' }), function(req, res) {
      res.redirect('/'); //HOW DO I GET BACK TO MY APP? 
  });

  return router;
}
