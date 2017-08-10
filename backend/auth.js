var express = require('express');
var router = express.Router();
var models = require('./models');
var User = models.User;

module.exports = function(passport) {

  router.get('/auth/login',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] }));

  router.get('/auth/login/callback',
    passport.authenticate('spotify', { failureRedirect: '/' }), function(req, res) {
      res.redirect(`/auth/login/success?id=${req.user._id}`);
  });

  router.get('/auth/login/success', function(req, res) {
    //console.log(req.query.id)
    res.redirect(process.env.EXPO_URI + `/+?${req.query.id}`);
  })

  return router;
}
