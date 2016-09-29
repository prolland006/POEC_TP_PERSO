const
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  imageStore = require('../services/image-store');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/users/:user_id/images', function (req, res, next) {
  console.log(req.params.user_id);
  Image.find({ user_id: req.params.user_id}, function(err, images) {
    if (err) return next(err);
    console.log(images);
    let imagesList = [];
    let i = 0;
    for (let image of images) {
      imageStore.getImageUrl(image.id, image.type, req.headers.host).then(url => {
        imagesList.push({url: url, title: image.title});
        i++;
        if (i === images.length) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(imagesList));
        }
      });
    }
  });
});

router.get('/images/:fileName', function(req ,res) {
  let path = require('path');
  let file = path.join(__dirname, '../upload', req.params.fileName);
  console.log(file);
  res.sendFile(file);
});

router.post('/users/:user_id/images', function(req,res) {
  console.log('router.post!!!');
  console.log(req.body);
});
