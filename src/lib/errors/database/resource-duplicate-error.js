import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class ResourceDuplicateError extends BaseHttpError {
  static message = 'Resource duplication error. Resource with unique characteristic already exist.';

  constructor(message = ResourceDuplicateError.message) {
    super(message, HttpStatus.CONFLICT);
    this.name = ResourceDuplicateError.name;
  }
}

export default ResourceDuplicateError;
