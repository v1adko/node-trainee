function BaseHttpError(message, code) {
  // HTTP status code
  this.code = code || 500;
  // Main full message
  this.message = this.formatMessage(message);
  // Full stack of messages
  this.messages = [this.message];

  Error.captureStackTrace(this, this.constructor);
}
BaseHttpError.prototype = Object.create(Error.prototype);

// Send to client configured HTTP response object
BaseHttpError.prototype.send = function send(response) {
  response.status(this.code).json({ error: this.getresponseObject() });
};

// Add message in message stack and rewrite full message
BaseHttpError.prototype.addMessage = function addMessage(newMessagePart) {
  this.messages.push(newMessagePart);
  this.message = this.getFullErrorMessage();
};

// Join all  messages in one and return full message
BaseHttpError.prototype.getFullErrorMessage = function getFullErrorMessage() {
  return this.messages.join(' ');
};

// Config response object and return it
// Method accept "fields" only for inheriting this method like in next example:
// Example: getresponseObject = () => super.getresponseObject({ additionalField: 'example data' });
BaseHttpError.prototype.getresponseObject = function getresponseObject(fields) {
  const { ...responseObject } = fields;
  responseObject.message = this.message;
  responseObject.name = this.constructor.name;
  responseObject.code = this.code;
  responseObject.messages = this.messages;

  return responseObject;
};

// Return formatted message
// Returning format: "ErrorName(code): fullMessage"
// Example: ResourceDuplicateError(409): Resource duplication error.
BaseHttpError.prototype.formatMessage = function formatMessage(message) {
  return `${this.constructor.name}(${this.code}): ${message ||
    'Server-side error'}`;
};

export default BaseHttpError;
