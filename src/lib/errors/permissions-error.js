import HttpStatus from 'http-status-codes';
import BaseHttpError from './base-http-error';

class PermissionsError extends BaseHttpError {
  constructor(message) {
    const defaultMessage = 'Access was denied. Not enough permissions.';
    const defaultCode = HttpStatus.FORBIDDEN;

    super(message || defaultMessage, defaultCode);
  }
}

export default PermissionsError;
