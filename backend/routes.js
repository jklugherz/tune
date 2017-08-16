const express = require('express');
const router = express.Router();
var models = require('./models');
var User = models.User;
var Group = models.Group;

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

router.post('/groups/create', (req, res) => {
  const newGroup = new Group({
    name: req.body.name,
    owner: req.body.owner,
    members: req.body.members
  });
  newGroup.save((err, groups) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true, groups: groups})
    }
  })
})

router.get('/groups/allGroups', (req, res) => {
  Group.find({}, (err, groups) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true, groups: groups})
    }
  })
})

router.get('/groups/:id', (req, res) => {
  Group.find( {owner: req.params.id}, (err, groups) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true, groups: groups})
    }
  })
})


module.exports = router;
