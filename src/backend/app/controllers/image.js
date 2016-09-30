const
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  imageStore = require('../services/image-store');

module.exports = function (app) {
  app.use('/', router);
};

/**
 * get imagelist from a userId
 */
router.get('/users/:user_id/images', function (req, res, next) {
  Image.find({ user_id: req.params.user_id}, function(err, imageList) {
    let imagePromiseList;
    if (err) return next(err);
    imagePromiseList = imageList.map(image => {
      return imageStore.getImageUrl(image.id, image.type)
        .then(url => {
          return {id: image.id, url: url, title: image.title, description: image.description};
        });
    });

    Promise.all(imagePromiseList)
      .then(imageList => res.send(imageList));
  });
});

/**
 * get imagefilename from upload directory
 */
router.get('/images/:fileName', function(req ,res) {
  let path = require('path');
  let file = path.join(__dirname, '../upload', req.params.fileName);
  res.sendFile(file);
});

router.post('/users/:user_id/images', function(req,res) {

  /** enregistre l'image et renvoi l'ID */
  imageStore.saveImage({user_id:req.params.user_id, title:req.body.title, imageData:req.body.imageData});
  res.send();
});
