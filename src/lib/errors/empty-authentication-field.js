import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class EmptyAuthenticationField extends BaseHttpError {
  constructor(message = EmptyAuthenticationField.message) {
    const defaultMessage = 'All fields required.';
    const defaultCode = HttpStatus.BAD_REQUEST;

    super(message || defaultMessage, defaultCode);
  }
}

export default EmptyAuthenticationField;
