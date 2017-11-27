import BaseHttpError from './baseHttpError';
import { LOW_PERMISSIONS } from '../constants/errors';

class PermissionsError extends BaseHttpError {
  static message = 'Access was denied. Not enough permissions.';

  constructor(message = PermissionsError.message) {
    super(message, LOW_PERMISSIONS);
    this.name = PermissionsError.name;

    Error.captureStackTrace(this, PermissionsError);
  }
}

export default PermissionsError;
