import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class ResourceDoesNotExistAnymore extends BaseHttpError {
  constructor(message = ResourceDoesNotExistAnymore.message) {
    const defaultMessage = 'Resource has already been deleted';
    const defaultCode = HttpStatus.GONE;

    super(message || defaultMessage, defaultCode);
  }
}

export default ResourceDoesNotExistAnymore;
