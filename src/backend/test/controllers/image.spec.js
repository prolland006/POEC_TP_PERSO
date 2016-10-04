const app = require('../../app');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const request = require('supertest');

describe('Image controller', () => {

  beforeEach((done) => {
    Image.remove({}, function (err) {
      if (err){
        throw err;
      }
      done();
    });
  });

  afterEach(() => {
  });

  it('should return a list of image', (done) => {

    Image.insertMany([
      {type: "local", title: "cat1", description: "this is a cat 1", userId: 42, albums: []},
      {type: "local", title: "cat2", description: "this is a cat 2", userId: 42, albums: []},
      {type: "local", title: "cat3", description: "this is a cat 3", userId: 42, albums: []},
      {type: "local", title: "cat4", description: "this is a cat 4", userId: 42, albums: []},
      {type: "local", title: "cat5", description: "this is a cat 5", userId: 42, albums: []}
    ], function (err, docs) {
      if (err) { throw err }
      request(app)
        .get('/users/42/images')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, response) {
          if (err) {throw err}
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
