
const app = require('../../app');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');

describe('Image controller', () => {

  beforeEach((done) => {
    Image.find({}).then((imageList) => {
      console.log(imageList);
      done();
    });
/*
    Image.dropCollection();
*/
  });

  afterEach(() => {
  });

  it('should run the test', () => {

    // Image.insert(..)
/*
    request(app)
      .get('')
      .then()
*/

    // check imageManager.getImmage.calls.count()

  });

});
