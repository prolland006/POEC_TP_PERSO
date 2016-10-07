const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

function parseToken(req) {
  if (req && req.header && req.header('Authorization')) {
    return req.header('Authorization');
  }
  return null;
}

const authenticationMiddleware = (req, res, next) => {
  let token = parseToken(req);
  if (!token) {
    next();
  }
  User.checkToken(token, (err, user) => {
    if (!err && user) {
      req.user = user;
    }
    next();
  })

};

module.exports = authenticationMiddleware;
