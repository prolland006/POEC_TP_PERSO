const express = require('express');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const imageStore = require('../services/image-store');

module.exports.defineRoutes = function (router) {

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

  router.get('/images/:fileName', function (req, res) {
    let path = require('path');
    let file = path.join(__dirname, '../upload', req.params.fileName);
    res.sendFile(file);
  });

}
