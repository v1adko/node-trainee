import { TokenValidationError, PermissionsError } from '../errors';

const responses = [];

responses[TokenValidationError.name] = {
  auth: false,
  message: TokenValidationError.message
};

responses[PermissionsError.name] = {
  message: PermissionsError.message
};

export default responses;
