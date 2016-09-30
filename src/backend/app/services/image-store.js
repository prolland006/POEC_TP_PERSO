const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const path = require('path');

class ImageStore {
  constructor() {

  }

  saveImage(image) {

  }

  getImageUrl(id, type) {
    if (type === 'local') {
      return Promise.resolve('/images/' + path.join(id + ".jpg"));
    }
    return Promise.resolve();
  }
}

module.exports = new ImageStore();
