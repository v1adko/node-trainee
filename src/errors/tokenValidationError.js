import AppError from './baseError';
import { INVALID_TOKEN } from '../constants/errors';

// const defaultMessage = 'Invalid token';

class TokenValidationError extends AppError {
  static message = 'Invalid token';

  constructor(message = TokenValidationError.message) {
    super(message, INVALID_TOKEN);
    this.name = TokenValidationError.name;

    Error.captureStackTrace(this, TokenValidationError);
  }
}

export default TokenValidationError;
