import HttpStatus from 'http-status-codes';
import BaseHttpError from '../baseHttpError';

class UserDuplicateError extends BaseHttpError {
  static message = 'User already exists';
  static code = HttpStatus.CONFLICT;

  constructor(message = UserDuplicateError.message) {
    super(message, UserDuplicateError.code);
    this.name = UserDuplicateError.name;

    this.responseObject = {
      message: this.message
    };

    Error.captureStackTrace(this, UserDuplicateError);
  }
}

export default UserDuplicateError;
