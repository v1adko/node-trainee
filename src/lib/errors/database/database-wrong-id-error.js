import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class DatabaseWrongIDError extends BaseHttpError {
  message = 'You trying get user by invalid id, please check your user id';

  constructor(message = DatabaseWrongIDError.message) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = DatabaseWrongIDError.name;
  }
}

export default DatabaseWrongIDError;
