const
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  imageStore = require('../services/image-store');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/users/:userId/images', function (req, res, next) {
  Image.findByUser(req.params.userId, (err, imageList) => {
    let imagePromiseList;
    if (err) return next(err);
    imagePromiseList = imageList.map(image => {
      return imageStore.getImageUrl(image.id, image.type)
        .then(url => {
          if (!url)
            return false;
          return {id: image.id, url: url, title: image.title, description: image.description};
        });
    });

    Promise.all(imagePromiseList)
      .then(imageList => res.send(imageList.filter(image => image)));
  });
});

router.get('/images/:fileName', function(req ,res) {
  let path = require('path');
  let file = path.join(__dirname, '../upload', req.params.fileName);
  res.sendFile(file);
});

