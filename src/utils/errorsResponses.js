import { TokenValidationError, PermissionsError } from '../errors';

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

export default responses;
