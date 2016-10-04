const app = require('../../app');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const request = require('supertest');
const fs = require('fs');

describe('Image controller', () => {

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

    console.log('should store images in database');
    imageStore.saveImage({
      userId: 42,
      title: 'lel',
      imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2Qtan'
    })
      .then(id => {
        Image.find({_id: id}, (err, result) => {
          console.log(result);
          expect(result.length).toEqual(1);
          expect(result[0].user_id).toEqual(42);
          expect(result[0].title).toEqual('lel');

          //TODO check file existence
          console.log('test existence');
          let path = require('path');
          let filePathAndName = path.join(__dirname, '..','..','..','..','dist/upload/'+id+'.jpg');
          fs.access(filePathAndName, (err) => {
            console.log('fs.access');
            expect(err).toEqual(null); //the file exist

            fs.unlink(filePathAndName, (err) => {
              console.log('remove file ',filePathAndName);
              console.log('done');
              done();
            });


          });

        });
      })

  });
});
