var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  spotifyId: String,
  refreshToken: String,
  imageURL: String,
  accessToken: String
});

userSchema.statics.findOrCreate = function findOrCreate(idObj, tokensObj, infoObj, cb) {
  User.findOne(idObj, function(err, user) {
    if (err) console.log(err);
    else if (user) {
      user.refreshToken = tokensObj.refreshToken;
      user.save(function(err, user) {
        cb(err, user);
      })
    } else {
      var newUser = new User({
        spotifyId: idObj.spotifyId,
        refreshToken: tokensObj.refreshToken,
        accessToken: tokensObj.accessToken,
        imageURL: infoObj.imageURL,
        username: infoObj.username
      });
      newUser.save(function(err, user) {
        cb(err, user);
      })
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};
