import HTTP_STATUS_CODE from 'http-status-codes';

class AuthorizationError extends Error {
  name = 'AuthorizationError';
  status = HTTP_STATUS_CODE.UNAUTHORIZED;
  message = 'Authorization error occurred. Please repeat authentication.';

  constructor(message) {
    super(message);
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AuthorizationError;
