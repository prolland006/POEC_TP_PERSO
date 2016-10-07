const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto");

let _createToken = (id) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, function (err, buffer) {
      if (err) {
        reject(err);
      }
      resolve(id + buffer.toString('hex'));
    });
  });
};

let userSchema = new Schema({
  login: String,
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
      return callback(null, {userId: user.id, token: user.token});
    }
    _createToken(user.id)
      .then(token => {
        this.update({_id: user._id}, {token: token}, (err, docs) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, {userId: user.id, token: token});
        });
      })
      .catch(err => {
        throw err;
      });
  });
};

userSchema.statics.checkToken = function (token, callback) {
  this.findOne({token: token}, (err, user) => {
    if (err) {
      callback(err, false);
    }
    if (user && user.token) {
      return callback(null, user);
    }
    return callback(null, null);
  });
};

// Verify whether an user named "login" already exists in DB
userSchema.statics.checkExistingUser = function (login, callback) {

  this.findOne({login: login}, (err, user) => {
    if (err) {
      callback(err, false);
    }
    if (user) {
      return callback(null, user);  // user does exist in DB
    }
    return callback(null, null);    // user does not exist in DB
  });
};

// Insert a new user to DB
userSchema.statics.insertUser = function (credentials, callback) {
  let encryptedPassword = crypto.createHash('sha256').update(credentials.password).digest('base64');

  this.insertMany([{login: credentials.login, password: encryptedPassword}], (err, user) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, user[0]);   // user is an array of one element
  })
};


mongoose.model('User', userSchema);
