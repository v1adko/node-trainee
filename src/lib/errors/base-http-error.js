class BaseHttpError {
  constructor(message, status) {
    // super(message);

    this.message = message;

    this.name = BaseHttpError.name;

    Error.captureStackTrace(this, BaseHttpError);

    this.responseObject = {
      message: this.message
    };

    this.status = status || 500;
  }

  send(response) {
    response.status(this.status).json(this.responseObject);
  }
}

export default BaseHttpError;
