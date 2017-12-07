import HTTP_STATUS_CODE from 'http-status-codes';

class PermissionsError extends Error {
  name = 'PermissionsError';
  status = HTTP_STATUS_CODE.FORBIDDEN;
  message = 'Access was denied. Not enough permissions.';

  constructor(message) {
    super(message);
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default PermissionsError;
