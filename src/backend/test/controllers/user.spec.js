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

    it('should return a token', (done) => {

      User.getToken = jasmine.createSpy('getToken').andCallFake((credential, callback) => {
        callback(null, '4242424242');
      });

      request(app)
        .post('/login')
        .send({login: 'foo', password: 'bar'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response) => {

            expect(err).toBeNull();

            /* should have 1 fields: token. */
            expect(Object.keys(response.body).length).toEqual(1);
            expect(response.body.token).toEqual('4242424242');

            done();

        });

    });

  });


});
