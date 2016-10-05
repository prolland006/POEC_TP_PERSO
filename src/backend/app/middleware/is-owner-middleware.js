
const isOwnerMiddleware = (req, res, next) => {
  if (req.user && req.user.id && req.param('userId') === req.user.id) {
    return next(null);
  }
  return next(new Error());
};

module.exports = isOwnerMiddleware;
