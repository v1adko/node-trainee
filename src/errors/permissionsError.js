import AppError from './baseError';
import { LOW_PERMISSIONS } from '../constants/errors';

class PermissionsError extends AppError {
  static message = 'Not enough permissions';

  constructor(message = PermissionsError.message) {
    super(message, LOW_PERMISSIONS);
    this.name = PermissionsError.name;

    Error.captureStackTrace(this, PermissionsError);
  }
}

export default PermissionsError;
