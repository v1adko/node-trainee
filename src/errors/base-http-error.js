class BaseHttpError extends Error {
  constructor(message, status) {
    super(message);

    this.name = BaseHttpError.name;

    Error.captureStackTrace(this, BaseHttpError);

    this.status = status || 500;
  }
}

export default BaseHttpError;
