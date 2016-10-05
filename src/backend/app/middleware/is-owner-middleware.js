
const isOwnerMiddleware = (req, res, next, err) => {
  if (req.user && req.user.id && req.param('userId') === req.user.id) {
    return next();
  }
  return err();
};

module.exports = isOwnerMiddleware;
