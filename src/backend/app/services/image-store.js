const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const path = require('path');
const imgOnDrive = require('./image-on-drive');

class ImageStore{
  constructor() {
    console.log("ImageStore constructor");
  }

  // collection Images:
  // id, type, title, description, user_id, albums
  //
  // collection Users:
  // user_id, login, password, email (edited)

  /** enregistre l'image et renvoi l'ID */
  saveImage(user_id, title, imageData) {
    console.log("saveImage ", user_id, title );

    // TODO for type, description, albums
    let img = new Image({type:'', title:title, description:'', user_id:user_id, albums:[]});

    img.save(function(err, result) {

      if (err) { console.log(err); return next(err); }

      imgOnDrive.save(img._id, imageData)
        .then(data => console.log('write image file OK'))
        .catch(err => console.log('error ',err));


      // return result;
    });

    return 1;
  }



  getImageUrl(id, type, host) {
    //if (type === 'local') {
        let file = Promise.resolve('/images/'+path.join(id+".jpg"));
        return file;
    //}
  }

}

module.exports = new ImageStore();
