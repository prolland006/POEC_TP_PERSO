
const isLoggedMiddleware = (req, res, next) => {
  if (req.user) {
    return next(null);
  }
  return next(new Error());
};

module.exports = isLoggedMiddleware;
