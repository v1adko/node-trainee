import HttpStatus from 'http-status-codes';
import BaseHttpError from '../baseHttpError';

class DatabaseWrongIDError extends BaseHttpError {
  static message = 'You trying get user by invalid id, please check your user id';
  static code = HttpStatus.BAD_REQUEST;

  constructor(message = DatabaseWrongIDError.message) {
    super(message, DatabaseWrongIDError.code);
    this.name = DatabaseWrongIDError.name;

    this.responseObject = {
      message: this.message
    };

    Error.captureStackTrace(this, DatabaseWrongIDError);
  }
}

export default DatabaseWrongIDError;
