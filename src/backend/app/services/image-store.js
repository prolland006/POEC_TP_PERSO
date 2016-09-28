const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const path = require('path');

class ImageStore{
  constructor() {

  }

  /** enregistre l'image et renvoi l'ID */
  saveImage(image) {

  }

  getImageUrl(id, type, host) {
    //if (type === 'local') {
        let file = Promise.resolve('/images/'+path.join(id+".jpg"));
        return file;
    //}
  }

}

module.exports = new ImageStore();
