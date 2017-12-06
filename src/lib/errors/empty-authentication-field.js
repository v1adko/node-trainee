import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class EmptyAuthenticationField extends BaseHttpError {
  static message = 'All fields required.';

  constructor(message = EmptyAuthenticationField.message) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = EmptyAuthenticationField.name;

    Error.captureStackTrace(this, EmptyAuthenticationField);
  }
}

export default EmptyAuthenticationField;
