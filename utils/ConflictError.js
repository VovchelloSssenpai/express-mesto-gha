class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Пользователь уже существует';
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
