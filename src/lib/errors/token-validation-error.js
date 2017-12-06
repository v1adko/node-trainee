import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class TokenValidationError extends BaseHttpError {
  constructor(message = TokenValidationError.message) {
    const defaultMessage = 'Invalid token, please repeat authentication.';
    const defaultCode = HttpStatus.UNAUTHORIZED;

    super(message || defaultMessage, defaultCode);
  }

  getresponseObject = () => super.getresponseObject({ auth: false });
}

export default TokenValidationError;
