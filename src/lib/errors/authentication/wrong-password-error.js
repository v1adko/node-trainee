import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class WrongPasswordError extends BaseHttpError {
  constructor(message) {
    const defaultMessage = 'Password is wrong, please check input data';
    const defaultCode = HttpStatus.BAD_REQUEST;

    super(message || defaultMessage, defaultCode);
  }
}

export default WrongPasswordError;
