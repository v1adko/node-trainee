import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class ResourceDoesNotExistAnymore extends BaseHttpError {
  static message = 'Resource has already been deleted';

  constructor(message = ResourceDoesNotExistAnymore.message) {
    super(message, HttpStatus.GONE);
    this.name = ResourceDoesNotExistAnymore.name;
  }
}

export default ResourceDoesNotExistAnymore;
