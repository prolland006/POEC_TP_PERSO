const app = require('../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Image = mongoose.model('Image');
const request = require('supertest');
const ImageStore = require('../../app/services/image-store');

describe('Image controller', () => {


  describe('GET /users/:userId/images', () => {

    beforeEach((done) => {
      Image.remove({}, function (imageErr) {
        if (imageErr) {
          throw imageErr;
        }
        User.remove({}, function (userErr) {
          if (userErr) {
            throw userErr;
          }
          done();
        });
      });
    });

    afterEach(() => {
    });

    it('should return a list of image if token is valid', (done) => {

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        Image.insertMany([
          {type: "local", title: "cat1", description: "this is a cat 1", userId: users[0].id, albums: []},
          {type: "local", title: "cat2", description: "this is a cat 2", userId: users[0].id, albums: []},
          {type: "local", title: "cat3", description: "this is a cat 3", userId: users[0].id, albums: []},
          {type: "local", title: "cat4", description: "this is a cat 4", userId: users[0].id, albums: []},
          {type: "local", title: "cat5", description: "this is a cat 5", userId: users[0].id, albums: []}
        ], function (imageErr) {
          expect(imageErr).toBeNull();
          request(app)
            .get(`/users/${users[0].id}/images`)
            .set('Authorization', '12345')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, response) {
              expect(err).toBeNull();
              expect(response.body.length).toEqual(5);

              /* Image should have 4 fields: id, title, description, url. */
              expect(Object.keys(response.body[0]).length).toEqual(4);
              expect(response.body[0].id).toMatch(/^[0-9a-f]+$/);
              expect(response.body[0].title).toEqual('cat1');
              expect(response.body[0].url).toEqual(`/upload/${response.body[0].id}.jpg`);
              expect(response.body[1].id).toMatch(/^[0-9a-f]+$/);
              expect(response.body[1].title).toEqual('cat2');
              expect(response.body[1].url).toEqual(`/upload/${response.body[1].id}.jpg`);
              expect(response.body[2].id).toMatch(/^[0-9a-f]+$/);
              expect(response.body[2].title).toEqual('cat3');
              expect(response.body[2].url).toEqual(`/upload/${response.body[2].id}.jpg`);
              expect(response.body[3].id).toMatch(/^[0-9a-f]+$/);
              expect(response.body[3].title).toEqual('cat4');
              expect(response.body[3].url).toEqual(`/upload/${response.body[3].id}.jpg`);
              expect(response.body[4].id).toMatch(/^[0-9a-f]+$/);
              expect(response.body[4].title).toEqual('cat5');
              expect(response.body[4].url).toEqual(`/upload/${response.body[4].id}.jpg`);
              done();
            });
        });
      });
    });

    it('should return a 401 error if token is not set', (done) => {

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        Image.insertMany([
          {type: "local", title: "cat1", description: "this is a cat 1", userId: users[0].id, albums: []},
          {type: "local", title: "cat2", description: "this is a cat 2", userId: users[0].id, albums: []},
          {type: "local", title: "cat3", description: "this is a cat 3", userId: users[0].id, albums: []},
          {type: "local", title: "cat4", description: "this is a cat 4", userId: users[0].id, albums: []},
          {type: "local", title: "cat5", description: "this is a cat 5", userId: users[0].id, albums: []}
        ], function (imageErr) {
          expect(imageErr).toBeNull();
          request(app)
            .get(`/users/${users[0].id}/images`)
            .expect(401)
            .end(done);
        });
      });
    });

    it('should return a 401 error if token is invalid', (done) => {

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        Image.insertMany([
          {type: "local", title: "cat1", description: "this is a cat 1", userId: users[0].id, albums: []},
          {type: "local", title: "cat2", description: "this is a cat 2", userId: users[0].id, albums: []},
          {type: "local", title: "cat3", description: "this is a cat 3", userId: users[0].id, albums: []},
          {type: "local", title: "cat4", description: "this is a cat 4", userId: users[0].id, albums: []},
          {type: "local", title: "cat5", description: "this is a cat 5", userId: users[0].id, albums: []}
        ], function (imageErr) {
          expect(imageErr).toBeNull();
          request(app)
            .get(`/users/${users[0].id}/images`)
            .set('Authorization', '1234567')
            .expect(401)
            .end(done);

        });
      });
    });

  });


  describe('POST /users/:userId/images', () => {

    let imageStoreSaveImageBackup;
    beforeEach((done) => {
      imageStoreSaveImageBackup = ImageStore.saveImage;
      Image.remove({}, function (imageErr) {
        if (imageErr) {
          throw imageErr;
        }
        User.remove({}, function (userErr) {
          if (userErr) {
            throw userErr;
          }
          done();
        });
      });
    });

    afterEach(() => {
      ImageStore.saveImage = imageStoreSaveImageBackup;
    });

    it('should return 200 if image successfully saved and token is valid', (done) => {

      ImageStore.saveImage = (imageObject) => Promise.resolve('42');

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        request(app)
          .post(`/users/${users[0].id}/images`)
          .set('Authorization', '12345')
          .send({
            title: 'lel',
            imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2Qtan'
          })
          .expect(200)
          .end(done);
      });
    });

    it('should return 500 if image unsuccessfully saved and token is valid', (done) => {

      ImageStore.saveImage = (imageObject) => Promise.reject(new Error());

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        request(app)
          .post(`/users/${users[0].id}/images`)
          .set('Authorization', '12345')
          .send({
            title: 'lel',
            imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2Qtan'
          })
          .expect(500)
          .end(done);
      });
    });

    it('should return 401 if token is not valid', (done) => {

      ImageStore.saveImage = (imageObject) => Promise.reject(new Error());

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        request(app)
          .post(`/users/${users[0].id}/images`)
          .set('Authorization', '1234567')
          .send({
            title: 'lel',
            imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2Qtan'
          })
          .expect(401)
          .end(done);
      });
    });

    it('should return 401 if token is not set', (done) => {

      ImageStore.saveImage = (imageObject) => Promise.reject(new Error());

      User.insertMany([
        {"login": "foo@bar.com", "password": "hOsP8D1mmyJy0D9HEw456XdATGof8k4i5SfhOhOAfvI=", "token": "12345"}
      ], function (userErr, users) {
        expect(userErr).toBeNull();
        request(app)
          .post(`/users/${users[0].id}/images`)
          .send({
            title: 'lel',
            imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2Qtan'
          })
          .expect(401)
          .end(done);
      });
    });

  });


});
