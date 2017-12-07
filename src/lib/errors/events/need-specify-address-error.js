import HttpStatus from 'http-status-codes';
import BaseHttpError from '../base-http-error';

class NeedSpecifyAddressError extends BaseHttpError {
  constructor(message) {
    const defaultMessage = 'Please specify address.';
    const defaultCode = HttpStatus.BAD_REQUEST;

    super(`${message} ${defaultMessage}`, defaultCode);
  }
}

export default NeedSpecifyAddressError;
