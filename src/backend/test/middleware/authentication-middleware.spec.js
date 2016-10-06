const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const authenticationMiddleware = require('../../app/middleware/authentication-middleware');

describe('AuthenticationMiddleware', () => {

  let userGetTokenBackup;

  beforeEach(() => {
    userGetTokenBackup = User.checkToken;
  });

  afterEach(() => {
    User.checkToken = userGetTokenBackup;
  });

  it('should put user in request if token is defined and valid', (done) => {
    let req = {header: ((param) => {if (param === 'Authorization') return '123456789';})};
    let res = {};

    User.checkToken = jasmine.createSpy('checkToken').andCallFake((token, callback) => {
      callback(null, {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'});
    });
    authenticationMiddleware(req, res, () => {
      expect(req.user.id).toEqual('45633786');
      expect(req.user.login).toEqual('foo@bar.com');
      expect(req.user.password).toEqual('test');
      expect(req.user.token).toEqual('123456789');
      done();
    });
  });

  it('should call next if no token is given', (done) => {
    let req = {};
    let res = {};

    User.checkToken = jasmine.createSpy('checkToken').andCallFake((token, callback) => {
      callback(null, {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'});
    });
    authenticationMiddleware(req, res, () => {
      done();
    });
  });

  it('should call next if token doesn\'t exist', (done) => {
    let req = {header: ((param) => {if (param === 'Authorization') return '123456789';})};
    let res = {};

    User.checkToken = jasmine.createSpy('checkToken').andCallFake((token, callback) => {
      callback(null, {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'});
    });
    authenticationMiddleware(req, res, () => {
      done();
    });
  });

});

