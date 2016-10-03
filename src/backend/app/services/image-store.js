const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIRECTORY='../upload/';

class ImageStore {

  constructor() {
  }

  // collection Images:
  // id, type, title, description, user_id, albums
  //
  // collection Users:
  // user_id, login, password, email (edited)


  // {user_id:req.params.user_id, title:req.body.title, imageData:req.body.imageData}
//  saveImage(user_id, title, imageData) {


  /**
   * enregistre l'image et renvoi une Promise contenant l'ID
   */
   saveImage(imageObject) {
      return new Promise((resolve, reject) => {
        console.log("saveImage ", imageObject.userId, imageObject.title);

        // TODO for type, description, albums
        let img = new Image({
          type: 'local',
          title: imageObject.title,
          description: '',
          user_id: imageObject.userId,
          albums: []
        });

        let that = this;
        img.save(function (err, result) {

          if (err) {
            console.log(err);
            return next(err);
          }

          that.saveOnDisk(img._id, imageObject.imageData)
            .then(data => resolve(img._id))
            .catch(err => reject(err));
        });
      })
  }

  decodeBase64Image(dataString) {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  /**
   * write the image
   * @param id
   * @param imgData
   * @returns {Promise}
   */
  saveOnDisk(id , imgData) {
    let filename= UPLOAD_DIRECTORY+id+'.jpg';

    let path = require('path');
    let filePath = path.join(__dirname, filename);

    console.log("write file ", filePath);

    var imageBuffer = this.decodeBase64Image(imgData);
    console.log(imageBuffer);

    return new Promise(function(resolve,reject) {
      fs.writeFile(filePath, imageBuffer.data, function(err)  {
        if (err) {
          reject(err);
        }
        else {
          resolve(imageBuffer.data);
        }
      });
    });

  }

  getImageUrl(id, type) {
    if (type === 'local') {
      return Promise.resolve('/images/' + path.join(id + ".jpg"));
    }
    return Promise.resolve();
  }

}

module.exports = new ImageStore();
