import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class RequestValidationError extends BaseHttpError {
  static message = 'All fields required.';

  constructor(message = RequestValidationError.message) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = RequestValidationError.name;
  }
}

export default RequestValidationError;
