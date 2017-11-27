import BaseHttpError from './baseHttpError';
import { INVALID_TOKEN } from '../constants/errors';

class TokenValidationError extends BaseHttpError {
  static message = 'Invalid token, please repeat authentication.';

  constructor(message = TokenValidationError.message) {
    super(message, INVALID_TOKEN);
    this.name = TokenValidationError.name;

    Error.captureStackTrace(this, TokenValidationError);
  }
}

export default TokenValidationError;
