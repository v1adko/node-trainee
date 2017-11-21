import permissionsConst from '../constants/permissions';

function getRoleValue(role) {
  if (!role) return permissionsConst.PUBLIC.value;
  return permissionsConst[role.toUpperCase()].value;
}

function permissionsValidator(permissions) {
  return (req, res, next) => {
    if (!req.user || permissions.value <= getRoleValue(req.user.role)) {
      return next();
    }
    return res
      .status(403)
      .send({ message: "You don't have permission for this action" });
  };
}

export default permissionsValidator;
