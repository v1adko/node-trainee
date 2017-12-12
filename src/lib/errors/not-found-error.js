import HTTP_STATUS_CODE from 'http-status-codes';

class NotFoundError extends Error {
  name = 'NotFoundError';
  status = HTTP_STATUS_CODE.NOT_FOUND;
  message = 'NotFound error occurred. Please, check address and input data.';

  constructor(message) {
    super(message);
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;
