import HttpStatus from 'http-status-codes';
import BaseHttpError from './baseHttpError';

class TokenValidationError extends BaseHttpError {
  static message = 'Invalid token, please repeat authentication.';
  static code = HttpStatus.UNAUTHORIZED;

  constructor(message = TokenValidationError.message) {
    super(message, TokenValidationError.code);
    this.name = TokenValidationError.name;

    Error.captureStackTrace(this, TokenValidationError);
  }
}

export default TokenValidationError;
