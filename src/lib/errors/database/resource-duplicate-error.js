import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class ResourceDuplicateError extends BaseHttpError {
  constructor(message) {
    const defaultMessage =
      'Cannot create resource, it has used unique fields what was engaged.';
    const defaultCode = HttpStatus.CONFLICT;

    super(message || defaultMessage, defaultCode);
  }
}

export default ResourceDuplicateError;
