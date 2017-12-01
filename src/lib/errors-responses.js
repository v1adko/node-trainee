import {
  TokenValidationError,
  PermissionsError,
  EmptyAuthenticationField,
  RequestValidationError
} from './errors';

const responses = [];

// Token validation errors
responses[TokenValidationError.name] = {
  auth: false,
  message: TokenValidationError.message
};

// Permissions errors
responses[PermissionsError.name] = {
  message: PermissionsError.message
};

// Authentication errors
responses[EmptyAuthenticationField.name] = {
  message: EmptyAuthenticationField.message
};

// Validation errors
responses[RequestValidationError.name] = {
  message: RequestValidationError.message
};

export default responses;
