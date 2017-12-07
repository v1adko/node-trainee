import HTTP_STATUS_CODE from 'http-status-codes';

class WrongPasswordError extends Error {
  name = 'WrongPasswordError';
  status = HTTP_STATUS_CODE.BAD_REQUEST;
  message = 'Password is wrong, please check input data.';
  constructor(message) {
    super(message);
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default WrongPasswordError;
