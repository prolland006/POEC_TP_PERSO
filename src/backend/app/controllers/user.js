const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.defineRoutes = function (router) {

  router.post('/login', function (req, res, next) {

    if (!req.body || !req.body.login || !req.body.password) {
      console.log('error lel');
      return res.send(404);
    }

    User.getToken({login: req.body.login, password: req.body.password}, (err, userCredential) => {
      if (err) {
        return res.send(404);
      }
      res.send(200, userCredential);
    });

  });

};




