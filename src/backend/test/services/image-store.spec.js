const app = require('../../app');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const request = require('supertest');
const fs = require('fs');

describe('Image-store service', () => {

  beforeEach((done) => {
    Image.remove({}, function (err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  afterEach(() => {

  });

  it('should store images in database', (done) => {
    const imageStore = require('../../app/services/image-store');

    imageStore.saveImage({
      userId: 42,
      title: 'lel',
      imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2Qtan'
    })
      .then(id => {
        Image.find({_id: id}, (err, result) => {
          expect(result.length).toEqual(1);
          expect(result[0].userId).toEqual(42);
          expect(result[0].title).toEqual('lel');

          //TODO check file existence
          let path = require('path');
          let filePathAndName = path.join(__dirname, '..','..','..','..','dist/upload/'+id+'.jpg');
          fs.access(filePathAndName, (err) => {
            expect(err).toEqual(null); //the file exist

            fs.unlink(filePathAndName, (err) => {
              done();
            });


          });

        });
      })

  });
});
