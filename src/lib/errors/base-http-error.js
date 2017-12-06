function BaseHttpError(message, status) {
  this.name = 'BaseCustomError';
  this.status = status || 500;
  this.message = message || 'Server-side error';

  Error.captureStackTrace(this, this.constructor);
}
BaseHttpError.prototype = new Error();
BaseHttpError.prototype.send = function send(response) {
  response.status(this.status).json(this.getresponseObject());
};
BaseHttpError.prototype.expandErrorMessage = function expandErrorMessage(
  newMessagePart
) {
  this.message = `${this.message}\n\t${newMessagePart}`;
};
BaseHttpError.prototype.expandErrorMessage = function expandErrorMessage(
  newMessagePart
) {
  this.message = `${this.message}\n\t${newMessagePart}`;
};
BaseHttpError.prototype.getresponseObject = function getresponseObject(fields) {
  const { ...responseObject } = fields;
  responseObject.message = this.message;
  return responseObject;
};

export default BaseHttpError;
