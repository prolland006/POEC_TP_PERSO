const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.defineRoutes = function (router) {

  router.post('/login', function (req, res, next) {

    console.log("Server /login login/pwd ", req.body.login, req.body.password);

    if (!req.body || !req.body.login || !req.body.password) {
      return res.send(404);
    }

    User.getToken({login: req.body.login, password: req.body.password}, (err, userCredential) => {
      if (err) {
        return res.send(404);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(userCredential);
    });

  });

  router.post('/signup', function (req, res, next) {

    if (!req.body || !req.body.login || !req.body.password) {
      return res.send(404);
    }

    // if this user already exists in DB, we must reject the signup request
    User.checkExistingUser(req.body.login, (err, user) => {
      if (err) {
        return res.send(500);
      }
      if (user) {
        console.log("Server /signup user already signed up");

        return res.send(403);   // forbidden
      } else {
        User.insertUser({login: req.body.login, password: req.body.password}, (err, user) => {
          if (err) {
            return res.send(500);
          }
          res.send(201);
        });
      }
    });

  });
};




