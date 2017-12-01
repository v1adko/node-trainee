import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class PermissionsError extends BaseHttpError {
  static message = 'Access was denied. Not enough permissions.';
  static code = HttpStatus.FORBIDDEN;

  constructor(message = PermissionsError.message) {
    super(message, PermissionsError.code);
    this.name = PermissionsError.name;

    Error.captureStackTrace(this, PermissionsError);
  }
}

export default PermissionsError;
