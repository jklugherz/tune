var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  spotifyId: String,
  refreshToken: String,
  // imageURL: String,
  accessToken: String
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};
