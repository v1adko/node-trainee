import HttpStatus from 'http-status-codes';
import BaseHttpError from '../baseHttpError';

class ResourceDoesNotExistAnymore extends BaseHttpError {
  static message = 'Resource has already been deleted';
  static code = HttpStatus.GONE;

  constructor(message = ResourceDoesNotExistAnymore.message) {
    super(message, ResourceDoesNotExistAnymore.code);
    this.name = ResourceDoesNotExistAnymore.name;

    this.responseObject = {
      message: this.message
    };

    Error.captureStackTrace(this, ResourceDoesNotExistAnymore);
  }
}

export default ResourceDoesNotExistAnymore;
