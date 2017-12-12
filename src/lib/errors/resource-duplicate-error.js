import HTTP_STATUS_CODE from 'http-status-codes';

class ResourceDuplicateError extends Error {
  name = 'ResourceDuplicateError';
  status = HTTP_STATUS_CODE.CONFLICT;
  message = 'Cannot create resource, it has used unique fields what was engaged.';

  constructor(uniqueField, message) {
    super(message);
    this.payload = { uniqueField };
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ResourceDuplicateError;
