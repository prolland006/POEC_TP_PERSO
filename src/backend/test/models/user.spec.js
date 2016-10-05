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
        {login: 'foo@bar.com', password: password, userId: '42'}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.getToken({login: 'foo@bar.com', password: 'yoloswag'}, (err, object) => {
          expect(err).toBeNull();
          User.findOne({id: docs.id}, function (err, user) {
            expect(err).toBeNull();
            expect(object.token).toEqual(user.token);
            expect(object.userId).toEqual(user.userId);
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
            expect(object.userId).toEqual(user.userId);
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

    it('should return true if the token exist', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password, token: '4242'}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.checkToken('4242', (err, valid) => {
          expect(err).toBeNull();
          expect(valid).toBeTruthy();
          done();
        });
      });
    });

    it('should return false if the token doesn\'t exist', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password, token: '4242'}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.checkToken('1337', (err, valid) => {
          expect(err).toBeNull();
          expect(valid).toBeFalsy();
          done();
        });
      });
    });
  });


});

