
const isLoggedMiddleware = (req, res, next) => {
  if (req.user) {
    return next(null);
  }
  return res.sendStatus(401);
};

module.exports = isLoggedMiddleware;
