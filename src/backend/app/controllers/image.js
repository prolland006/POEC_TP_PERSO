const express = require('express');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const User = mongoose.model('User');
const imageStore = require('../services/image-store');
const isOwnerMiddleware = require('../middleware/is-owner-middleware');
// const isLoggedMiddleware = require('../middleware/is-logged-middleware');

module.exports.defineRoutes = function (router) {
  /**
   * get imagelist from a userId
   */
  router.get('/users/:userId/images', isOwnerMiddleware, function (req, res, next) {
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
    // });
  });

  router.post('/users/:userId/images', isOwnerMiddleware, function (req, res) {

    /** enregistre l'image et renvoi l'ID */
    imageStore.saveImage({userId: req.params.userId, title: req.body.title, imageData: req.body.imageData})
      .then(id => {
        if (id) {
          return res.sendStatus(200);
        }
        res.sendStatus(500);
      })
      .catch(err => res.sendStatus(500))
  });

};
