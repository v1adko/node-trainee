import HTTP_STATUS_CODE from 'http-status-codes';

class TokenValidationError extends Error {
  name = 'TokenValidationError';
  status = HTTP_STATUS_CODE.UNAUTHORIZED;
  message = 'Invalid token, please repeat authentication.';

  constructor(message) {
    super(message);
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default TokenValidationError;
