const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const request = require('supertest');
//const jasmine = require('jasmine-node');

describe('User controller', () => {


  describe('login', () => {

    let userGetTokenBackup;

    beforeEach((done) => {
      userGetTokenBackup = User.getToken;

      User.remove({}, function (err) {
        if (err) {
          throw err
        }
        done();
      });
    });

    afterEach(() => {
      User.getToken = userGetTokenBackup;
    });

    it('should return an object {token, userId}', (done) => {

      User.getToken = jasmine.createSpy('getToken').andCallFake((credential, callback) => {
        callback(null, {token: '4242424242', userId: '42'});
      });

      request(app)
        .post('/login')
        .send({login: 'foo', password: 'bar'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {
            expect(err).toBeNull();
            /* should have 1 fields: token. */
            expect(Object.keys(response.body).length).toEqual(2);
            expect(response.body.token).toEqual('4242424242');
            expect(response.body.userId).toEqual('42');
            done();

        });
    });
  });

  describe('signup', () => {

    let userCheckExistingUserBackup;
    let userInsertUserBackup;

    beforeEach((done) => {
      userCheckExistingUserBackup = User.checkExistingUser;
      userInsertUserBackup        = User.insertUser;

      User.remove({}, function (err) {
        if (err) {
          throw err
        }
        done();
      });
    });

    afterEach(() => {
      User.checkExistingUser = userCheckExistingUserBackup;
      User.insertUser        = userInsertUserBackup;
    });

    it('should return status 201', (done) => {

      // Mock DB such that the user doesn't exist
      User.checkExistingUser = jasmine.createSpy('checkExistingUser').andCallFake((login, callback) => {
        callback(null, null);
      });
      // Mock DB such that the user is inserted successfully
      User.insertUser = jasmine.createSpy('insertUser').andCallFake((credential, callback) => {
        callback(null, {login: "foo", password: "bar"});
      });

      request(app)
        .post('/signup')
        .send({login: 'foo', password: 'bar'})
        .expect(201)
        .end(done);
    });

    it('should return status 403    ', (done) => {
      // Mock DB such that the user does exist
      User.checkExistingUser = jasmine.createSpy('checkExistingUser').andCallFake((credential, callback) => {
        callback(null,   {login: "foo", password: "bar"});
      });

      request(app)
        .post('/signup')
        .send({login: 'foo', password: 'bar'})
        .expect(403)
        .end(done);
    });
  });

});
