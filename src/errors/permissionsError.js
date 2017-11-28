import BaseHttpError from './baseHttpError';

class PermissionsError extends BaseHttpError {
  static message = 'Access was denied. Not enough permissions.';
  static code = 403;

  constructor(message = PermissionsError.message) {
    super(message, PermissionsError.code);
    this.name = PermissionsError.name;

    Error.captureStackTrace(this, PermissionsError);
  }
}

export default PermissionsError;
