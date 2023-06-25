const jwt = require('jsonwebtoken');
const WrongDataError = require('../utils/WrongDataError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new WrongDataError());
  }

  req.user = payload;
  return next();
};

module.exports = auth;
