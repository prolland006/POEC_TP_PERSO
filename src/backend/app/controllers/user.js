const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.defineRoutes = function (router) {

  router.post('/login', function (req, res) {

    if (!req.body || !req.body.login || !req.body.password) {
      return res.sendStatus(404);
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

  router.post('/signup', function (req, res, next) {

    if (!req.body || !req.body.login || !req.body.password) {
      return res.sendStatus(404);
    }

    // if this user already exists in DB, we must reject the signup request
    User.checkExistingUser(req.body.login, (err, user) => {
      if (err) {
        return res.sendStatus(500);
      }
      if (user) {
        return res.sendStatus(403);   // cannot sign up for this user >>> forbidden
      } else {
        User.insertUser({login: req.body.login, password: req.body.password}, (err, user) => {
          if (err) {
            return res.sendStatus(500);
          }
          res.sendStatus(201);        // successful insertion & signup
        });
      }
    });

  });
};




