const fs = require('fs');

const UPLOAD_DIRECTORY='../upload/';

class ImageOnDrive {

  constructor() {
    console.log("ImageOnDrive contructor");
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
  save(id , imgData) {
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
}

module.exports = new ImageOnDrive();

