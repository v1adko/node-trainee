import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class ResourceDuplicateError extends BaseHttpError {
  constructor(message = ResourceDuplicateError.message) {
    const defaultMessage =
      'Resource duplication error. Resource with unique characteristic already exist.';
    const defaultCode = HttpStatus.CONFLICT;

    super(message || defaultMessage, defaultCode);
  }
}

export default ResourceDuplicateError;
