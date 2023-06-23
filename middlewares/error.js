const DefaultError = require('../utils/DefaultError');
const IncorrectError = require('../utils/IncorrectError');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');
const WrongDataError = require('../utils/WrongDataError');
const LimitedAccessError = require('../utils/LimitedAccessError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error;
  if (err.message.includes('Validation failed')) {
    error = new IncorrectError();
  } else if (err.message === 'Not found' || err.message === 'Пользователь не найден') {
    error = new NotFoundError();
  } else if (err.name === 'CastError') {
    error = new IncorrectError();
  } else if (err.code === 11000) {
    error = new ConflictError();
  } else if (err.name === 'WrongDataError') {
    error = new WrongDataError();
  } else if (err.name === 'LimitedAccess') {
    error = new LimitedAccessError();
  } else {
    error = new DefaultError();
  }

  res
    .status(error.statusCode)
    .send({
      message: error.message,
    });
};

module.exports = errorHandler;
