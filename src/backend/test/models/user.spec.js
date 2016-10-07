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

  describe('checkExistingUser', () => {

    beforeEach((done) => {
      User.remove({}, function (err) {
        if (err) {
          throw err
        }
        done();
      });
    });

    it('should return user if the user exists', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.checkExistingUser('foo@bar.com', (err, user) => {
          expect(err).toBeNull();
          expect(user.login).toEqual('foo@bar.com');
          expect(user.password).toEqual(password);
          done();
        });
      });
    });

    it('should return null if the user does not exist', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertMany([
        {login: 'foo@bar.com', password: password}
      ], function (err, docs) {
        expect(err).toBeNull();
        User.checkExistingUser('toto@bar.com', (err, user) => {
          expect(err).toBeNull();
          expect(user).toEqual(null);
          done();
        });
      });
    });
  });

  describe('insertUser', () => {

    beforeEach((done) => {
      User.remove({}, function (err) {
        if (err) {
          throw err
        }
        done();
      });
    });

    it('should return user if insertion is successful', (done) => {
      let password = crypto.createHash('sha256').update('yoloswag').digest('base64');
      User.insertUser(
        {login: 'foo@bar.com', password: 'yoloswag'}
      , function (err, user) {
        expect(err).toBeNull();
        expect(user[0].login).toEqual('foo@bar.com');
        expect(user[0].password).toEqual(password);
        done();
      });
    });
  });

});

