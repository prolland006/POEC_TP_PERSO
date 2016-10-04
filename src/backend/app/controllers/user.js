const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.defineRoutes = function (router) {

  router.post('/login', function (req, res, next) {

    if (!req.body || !req.body.login || !req.body.password) {
      return res.send(404);
    }

    User.getToken({login: req.body.login, password: req.body.password}, (err, token) => {
      if (err) {
        return res.send(404);
      }
      res.send({token: token});
    });

  });

};




