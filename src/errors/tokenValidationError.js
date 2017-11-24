import AppError from './baseError';
import { INVALID_TOKEN } from '../constants/errors';

const defaultMessage = 'Invalid token';

class TokenValidationError extends AppError {
  constructor(message = defaultMessage) {
    super(message, INVALID_TOKEN); // TODO: "Upgrade" and "Connection" headers
    this.name = TokenValidationError.name;

    Error.captureStackTrace(this, TokenValidationError);
  }
}

export default TokenValidationError;
