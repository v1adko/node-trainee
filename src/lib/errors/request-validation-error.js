import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class RequestValidationError extends BaseHttpError {
  static message = 'All fields required.';
  static code = HttpStatus.BAD_REQUEST;

  constructor(message = RequestValidationError.message) {
    super(message, RequestValidationError.code);
    this.name = RequestValidationError.name;

    Error.captureStackTrace(this, RequestValidationError);
  }
}

export default RequestValidationError;
