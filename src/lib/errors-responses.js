import {
  TokenValidationError,
  PermissionsError,
  EmptyAuthenticationField
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

export default responses;
