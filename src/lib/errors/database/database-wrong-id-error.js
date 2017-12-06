import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class DatabaseWrongIDError extends BaseHttpError {
  constructor(message = DatabaseWrongIDError.message) {
    const defaultMessage =
      'You trying get user by invalid id, please check your user id';
    const defaultCode = HttpStatus.BAD_REQUEST;

    super(message || defaultMessage, defaultCode);
  }
}

export default DatabaseWrongIDError;
