const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto");

let _createToken = (id) => {
  //TODO generate proper hash
  return id + '123';
};

let userSchema = new Schema({
  login: String,
  userId: String,
  password: String,
  token: String
});

userSchema.statics.getToken = function (credentials, callback) {
  let encryptedPassword = crypto.createHash('sha256').update(credentials.password).digest('base64');
  this.findOne({login: credentials.login, password: encryptedPassword}, (err, user) => {
    if (err) {
      return callback(err, null);
    }
    if (!user) {
      return callback(new Error(), null);
    }
    if (user.token) {
      return callback(null, {userId: user.userId, token: user.token});
    }
    let token = _createToken(user._id);
    this.update({_id: user._id}, {token: token}, (err, updatedUser) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, {userId: user.userId, token: token});
    });
  });
};

userSchema.statics.checkToken = function (token, callback) {
  this.findOne({token: token}, (err, user) => {
    if (err) {
      callback(err, false);
    }
    if (user && user.token) {
      return callback(null, true);
    }
    return callback(null, false);
  });
};

mongoose.model('User', userSchema);
