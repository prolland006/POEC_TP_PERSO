
const isOwnerMiddleware = (req, res, next, err) => {
  if (req.param('userId') === req.user._id) {
    return next();
  }
  return err();
};

module.exports = isOwnerMiddleware;
