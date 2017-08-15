const express = require('express');
const router = express.Router();
var models = require('./models');
var User = models.User;

router.get('/userprofile/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.json({success: false, message: err});
    } else {
      res.json({success: true, user: user})
    }
  })
})

router.get('/groups/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true, users: users})
    }
  })
})



module.exports = router;
