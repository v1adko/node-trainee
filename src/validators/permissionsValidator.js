import permissionsConst from '../config/permissions';

function getRoleValue(role) {
  return permissionsConst[role.toUpperCase()].value;
}

function permissionsValidator(permissions) {
  return (req, res, next) => {
    if (permissions.value >= getRoleValue(req.user.role)) {
      return next();
    }
    return res
      .status(403)
      .send({ message: "You don't have permission for this action" });
  };
}

export default permissionsValidator;
