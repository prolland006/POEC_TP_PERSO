const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require("crypto");

describe('User model', () => {


  describe('getToken', () => {

    beforeEach((done) => {
      User.remove({}, function (err) {
        if (err) {
          throw err
        }
        done();
      });
    });

    it('should create a token if it doesn\'t exist', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.getToken({login: 'foo@bar.com', password: 'yoloswag'}, (err, object) => {
          expect(err).toBeNull();
          User.findOne({id: docs.id}, function (err, user) {
            expect(err).toBeNull();
            expect(object.token).toEqual(user.token);
            expect(object.userId).toEqual(user.id);
            done();
          });
        });
      });
    });

    it('should return existing token', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password, token: 'sisitavu'}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.getToken({login: 'foo@bar.com', password: 'yoloswag'}, (err, object) => {
          expect(err).toBeNull();
          expect(object.token).toEqual('sisitavu');
          User.findOne({id: docs.id}, function (err, user) {
            expect(err).toBeNull();
            expect(object.token).toEqual(user.token);
            expect(object.userId).toEqual(user.id);
            done();
          });
        });
      });
    });

    it('should return error if user doesn\'t exist', (done) => {
      User.getToken({login: 'foo@bar.com', password: 'yoloswag'}, (err, token) => {
        expect(err).toBeTruthy();
        done();
      });
    });

  });

  describe('checkToken', () => {

    beforeEach((done) => {
      User.remove({}, function (err) {
        if (err) {
          throw err
        }
        done();
      });
    });

    it('should return user if the token exist', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password, token: '4242'}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.checkToken('4242', (err, user) => {
          expect(err).toBeNull();
          expect(user.login).toEqual('foo@bar.com');
          expect(user.password).toEqual(password);
          expect(user.token).toEqual('4242');
          done();
        });
      });
    });

    it('should return null if the token doesn\'t exist', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password, token: '4242'}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.checkToken('1337', (err, user) => {
          expect(err).toBeNull();
          expect(user).toBeNull();
          done();
        });
      });
    });
  });


});

