// Stub for extends from error in ES6 classes.
// NOTE/TODO: Remove it and do extends from Error when this behavior will be fixed.
function ErrorStub(message) {
  this.message = message || '';
}
ErrorStub.prototype = Object.create(Error.prototype);

class BaseHttpError extends ErrorStub {
  constructor(message, code) {
    super(message);
    const defaultMessage = 'Server-side error';

    this.code = code || 500;
    this.message = this.formatMessage(message || defaultMessage);
    this.messages = [this.message];

    Error.captureStackTrace(this, this.constructor);
  }

  getResponseObject(fields) {
    const { ...responseObject } = fields;
    responseObject.message = this.message;
    responseObject.name = this.constructor.name;
    responseObject.code = this.code;
    responseObject.messages = this.messages;

    return responseObject;
  }

  // Add message in message stack. For mutating message on different level of app.
  addMessage(newMessagePart) {
    this.messages.push(newMessagePart);
    const fullMessage = this.getFullErrorMessage();
    this.message = this.formatMessage(fullMessage);
  }

  getFullErrorMessage() {
    return this.messages.join(' ');
  }

  formatMessage(message) {
    return `${this.constructor.name}(${this.code}): ${message}`;
  }
}

export default BaseHttpError;
