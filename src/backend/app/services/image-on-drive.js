const fs = require('fs');

const UPLOAD_DIRECTORY='../upload/';

class ImageOnDrive {

  constructor() {
    console.log("ImageOnDrive contructor");
  }

  decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  save(id , imgData) {
    let filename= UPLOAD_DIRECTORY+id+'.jpg';

    let path = require('path');
    let file = path.join(__dirname, filename);

    console.log("write file ", file);

    var imageBuffer = this.decodeBase64Image(imgData);
    console.log(imageBuffer);

    fs.writeFile(file, imageBuffer.data, function(err, result) {
      if (err)
        console.log('error: unable to write image file ',file);
      else
        console.log('write image file OK',file);

      return result;
    });
  }



}

module.exports = new ImageOnDrive();

