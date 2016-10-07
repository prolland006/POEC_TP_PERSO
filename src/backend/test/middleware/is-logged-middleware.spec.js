const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const isLoggedMiddleware = require('../../app/middleware/is-logged-middleware');

describe('isLoggedMiddleware', () => {

  it('should call next if req.token is defined', (done) => {
    let req = {user: {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'}};
    let res = {sendStatus: () => {throw new Error();}};
    let next = () => {
      done();
    };

    isLoggedMiddleware(req, res, next);
  });

  it('should call err if req.token is not defined', (done) => {
    let req = {};
    let res = {sendStatus: () => {done()}};
    let next = () => {
      throw new Error();
    };

    isLoggedMiddleware(req, res, next);
  });

});


