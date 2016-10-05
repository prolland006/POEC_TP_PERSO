const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
const User = mongoose.model('User');
const authenticationMiddleware = require('../../app/middleware/authentication-middleware');

describe('AuthenticationMiddleware', () => {

  let userGetTokenBackup;

  beforeEach((done) => {
    userGetTokenBackup = User.checkToken;

    User.remove({}, function (err) {
      if (err) {
        throw err
      }
      done();
    });
  });

  afterEach(() => {
    User.checkToken = userGetTokenBackup;
  });

  it('should put user in request if token is defined and valid', (done) => {
    let req = {'headers': {'Authorization': '123456789'}};
    let res = {};

    User.checkToken = jasmine.createSpy('checkToken').andCallFake((token, callback) => {
      callback(null, {id: '45633786', login: 'foo@bar.com', password: 'test', token: '123456789'});
    });
    authenticationMiddleware(req, res, () => {
      expect(req.token.id).toEqual('45633786');
      expect(req.token.login).toEqual('foo@bar.com');
      expect(req.token.password).toEqual('test');
      expect(req.token.token).toEqual('123456789');
      done();
    });
  });

});

