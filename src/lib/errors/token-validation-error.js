import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class TokenValidationError extends BaseHttpError {
  static message = 'Invalid token, please repeat authentication.';

  constructor(message = TokenValidationError.message) {
    super(message, HttpStatus.UNAUTHORIZED);
    this.name = TokenValidationError.name;
  }

  getresponseObject = () => super.getresponseObject({ auth: false });
}

export default TokenValidationError;
