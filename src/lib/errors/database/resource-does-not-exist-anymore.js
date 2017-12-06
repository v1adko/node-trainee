import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class ResourceDoesNotExistAnymore extends BaseHttpError {
  constructor(message = ResourceDoesNotExistAnymore.message) {
    const defaultMessage = 'Sorry, resource has already been deleted';
    const defaultCode = HttpStatus.GONE;

    super(message || defaultMessage, defaultCode);
  }
}

export default ResourceDoesNotExistAnymore;
