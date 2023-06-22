class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Пользователь не найден';
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
