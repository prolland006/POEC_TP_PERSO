
const isLoggedMiddleware = (req, res, next, err) => {
  if (req.param('userId')) {
    return next();
  }
  return err();
};

module.exports = isLoggedMiddleware;
