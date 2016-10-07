
const isOwnerMiddleware = (req, res, next) => {
  if (req.user && req.user.id && req.params.userId === req.user.id) {
    return next(null);
  }
  return res.sendStatus(401);
};

module.exports = isOwnerMiddleware;
