class IncorrectError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Неверные данные';
    this.name = 'IncorrectError';
    this.statusCode = 400;
  }
}

module.exports = IncorrectError;
