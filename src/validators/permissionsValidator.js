import permissionsConst from '../constants/permissions';

function getPermissionPriority(role) {
  if (!role) return 0;
  return permissionsConst[role.toUpperCase()].priority;
}

function permissionsValidator(permissions) {
  return (req, res, next) => {
    const { user } = req;
    if (
      !permissions ||
      (user && permissions.priority <= getPermissionPriority(user.role))
    ) {
      return next();
    }
    return res
      .status(403)
      .send({ message: "You don't have permission for this action" });
  };
}

export default permissionsValidator;
