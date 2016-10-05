const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

function parseToken(req) {
  if (req && req.headers && req.headers['Authorization']) {
    return req.headers['Authorization'];
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
      req.token = user;
    }
    next();
  })

};

module.exports = authenticationMiddleware;
