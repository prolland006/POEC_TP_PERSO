const express = require('express');
const authenticationMiddleware = require('../middleware/authentication-middleware');

let router = express.Router();

router.use(authenticationMiddleware);

module.exports = function (app) {
  app.use('/', router);
};

require('./home').defineRoutes(router);
require('./user').defineRoutes(router);
require('./image').defineRoutes(router);

