import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class TokenValidationError extends BaseHttpError {
  static message = 'Invalid token, please repeat authentication.';
  static code = HttpStatus.UNAUTHORIZED;

  constructor(message = TokenValidationError.message) {
    super(message, TokenValidationError.code);
    this.name = TokenValidationError.name;

    this.responseObject = {
      auth: false,
      message: this.message
    };

    Error.captureStackTrace(this, TokenValidationError);
  }

  send(response) {
    response.json(this.responseObject);
  }
}

export default TokenValidationError;
