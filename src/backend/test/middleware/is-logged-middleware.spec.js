const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const isLoggedMiddleware = require('../../app/middleware/is-logged-middleware');

describe('isLoggedMiddleware', () => {

  it('should call next if req.token is defined', (done) => {
    let req = {user: {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'}};
    let res = {};
    let next = () => {
      done();
    };
    let err = () => {
      throw new Error();
    };

    isLoggedMiddleware(req, res, next, err);
  });

  it('should call err if req.token is not defined', (done) => {
    let req = {};
    let res = {};
    let next = () => {
      throw new Error();
    };
    let err = () => {
      done();
    };

    isLoggedMiddleware(req, res, next, err);
  });

});


