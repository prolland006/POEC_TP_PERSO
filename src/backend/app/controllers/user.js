const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.defineRoutes = function (router) {

  router.post('/login', function (req, res) {

    if (!req.body || !req.body.login || !req.body.password) {
      return res.send(404);
    }

    User.getToken({login: req.body.login, password: req.body.password}, (err, userCredential) => {
      if (err) {
        return res.send(500);
      }
      if (!userCredential) {
        return res.send(404);
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(userCredential);
    });

  });

};




