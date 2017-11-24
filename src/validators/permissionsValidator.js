import permissionsConst from '../constants/permissions';
import { PermissionsError } from '../errors';

function getPermissionPriority(role) {
  return permissionsConst[role.toUpperCase()].priority;
}

function getPermissionsValidator(permissions) {
  return (request) => {
    const { user } = request;
    const priority = permissions && permissions.priority;

    if (!priority) {
      // Public route, no validation needed
      return;
    }

    if (priority && user && priority <= getPermissionPriority(user.role)) {
      // Private and user gave valid token
      return;
    }

    // Unauthorised
    throw new PermissionsError();
  };
}

export default getPermissionsValidator;
