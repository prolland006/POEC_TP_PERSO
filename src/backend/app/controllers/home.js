const express = require('express');

module.exports.defineRoutes = function (router) {

  router.get('/', function (req, res, next) {
    res.render('index');
  });

};
