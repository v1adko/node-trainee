import permissionsConst from '../../constants/permissions';
import { PermissionsError } from '../errors';

const getPermissionPriority = role =>
  permissionsConst[role.toUpperCase()].priority;

function permissionsValidator(methodPermission, request) {
  const { user } = request;
  const priority = methodPermission && methodPermission.priority;

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
}

export default permissionsValidator;
