/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Bad Request Error (400)
 */
class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

/**
 * Not Found Error (404)
 */
class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Server Error (500)
 */
class ServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  NotFoundError,
  ServerError
};