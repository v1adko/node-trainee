import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class RequestValidationError extends BaseHttpError {
  constructor(message = RequestValidationError.message) {
    const defaultMessage = 'All fields required.';
    const defaultCode = HttpStatus.BAD_REQUEST;

    super(message || defaultMessage, defaultCode);
  }
}

export default RequestValidationError;
