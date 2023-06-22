class LimitedAccessError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Доступ ограничен';
    this.name = 'LimitedAccess';
    this.statusCode = 403;
  }
}

module.exports = LimitedAccessError;
