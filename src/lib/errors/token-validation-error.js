import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class TokenValidationError extends BaseHttpError {
  constructor(message) {
    const defaultMessage = 'Invalid token, please repeat authentication.';
    const defaultCode = HttpStatus.UNAUTHORIZED;

    super(message || defaultMessage, defaultCode);
  }

  getResponseObject = () => super.getResponseObject({ auth: false });
}

export default TokenValidationError;
