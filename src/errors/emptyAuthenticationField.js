import HttpStatus from 'http-status-codes';
import BaseHttpError from './baseHttpError';

class EmptyAuthenticationField extends BaseHttpError {
  static message = 'All fields required.';
  static code = HttpStatus.BAD_REQUEST;

  constructor(message = EmptyAuthenticationField.message) {
    super(message, EmptyAuthenticationField.code);
    this.name = EmptyAuthenticationField.name;

    Error.captureStackTrace(this, EmptyAuthenticationField);
  }
}

export default EmptyAuthenticationField;
