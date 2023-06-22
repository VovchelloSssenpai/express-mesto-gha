const DefaultError = require('../utils/DefaultError');
const IncorrectError = require('../utils/IncorrectError');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error;

  if (err.message.includes('Validation failed')) {
    error = new IncorrectError();
  } else if (err.message === 'Not found') {
    error = new NotFoundError();
  } else if (err.name === 'CastError') {
    error = new IncorrectError();
  } else if (err.code === 11000) {
    error = new ConflictError();
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
