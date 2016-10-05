
const isLoggedMiddleware = (req, res, next, err) => {
  if (req.user) {
    return next();
  }
  return err();
};

module.exports = isLoggedMiddleware;
