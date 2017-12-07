import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class RequestValidationError extends BaseHttpError {
  constructor(message) {
    const defaultMessage = 'Invalid input data, please check it.';
    const defaultCode = HttpStatus.BAD_REQUEST;

    super(message || defaultMessage, defaultCode);
  }
}

export default RequestValidationError;
