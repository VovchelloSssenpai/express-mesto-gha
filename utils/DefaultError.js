class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.message = 'На сервере произошла ошибка';
    this.name = 'DefaultError';
    this.statusCode = 500;
  }
}

module.exports = DefaultError;
