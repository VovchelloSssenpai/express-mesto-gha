const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, повторите снова позже',
});

module.exports = limiter;
