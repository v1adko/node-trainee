import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class PermissionsError extends BaseHttpError {
  static message = 'Access was denied. Not enough permissions.';

  constructor(message = PermissionsError.message) {
    super(message, HttpStatus.FORBIDDEN);
    this.name = PermissionsError.name;
  }
}

export default PermissionsError;
