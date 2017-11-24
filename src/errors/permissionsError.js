import AppError from './baseError';
import { ACCESS_FORBIDDEN } from '../constants/errors';

const defaultMessage = 'Not enough permissions';

class PermissionsError extends AppError {
  constructor(message = defaultMessage) {
    super(message, ACCESS_FORBIDDEN);
    this.name = PermissionsError.name;

    Error.captureStackTrace(this, PermissionsError);
  }
}

export default PermissionsError;
