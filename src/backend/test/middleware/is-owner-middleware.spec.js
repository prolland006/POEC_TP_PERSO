const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const isOwnerMiddleware = require('../../app/middleware/is-owner-middleware');

describe('isOwnerMiddleware', () => {

  it('should call next if req.token is defined and match with query parameter', (done) => {
    let req = {
      user: {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'},
      param: (param) => {
        if (param === 'userId') {
          return '45633786';
        }
      }
    };
    let res = {};
    let next = () => {
      done();
    };
    let err = () => {
      throw new Error();
    };

    isOwnerMiddleware(req, res, next, err);
  });

  it('should call err if req.token is not defined and query parameter not defined', (done) => {
    let req = {param: () => {}};
    let res = {};
    let next = () => {
      throw new Error();
    };
    let err = () => {
      done();
    };

    isOwnerMiddleware(req, res, next, err);
  });

  it('should call err if query parameter not defined', (done) => {
    let req = {
      user: {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'},
      param: () => {}
    };
    let res = {};
    let next = () => {
      throw new Error();
    };
    let err = () => {
      done();
    };

    isOwnerMiddleware(req, res, next, err);
  });

  it('should call err if req.token is not defined', (done) => {
    let req = {
      param: (param) => {
        if (param === 'userId') {
          return '45633786';
        }
      }
    };
    let res = {};
    let next = () => {
      throw new Error();
    };
    let err = () => {
      done();
    };

    isOwnerMiddleware(req, res, next, err);
  });

  it('should call err if req.token does not match with query parameter', (done) => {
    let req = {
      user: {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'},
      param: (param) => {
        if (param === 'userId') {
          return '1337';
        }
      }
    };
    let res = {};
    let next = () => {
      throw new Error();
    };
    let err = () => {
      done();
    };

    isOwnerMiddleware(req, res, next, err);
  });

});


