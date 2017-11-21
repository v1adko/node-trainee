import permissionsConst from '../constants/permissions';

const { PUBLIC } = permissionsConst;

function getRoleValue(role) {
  if (!role) return PUBLIC.value;
  return permissionsConst[role.toUpperCase()].value;
}

function permissionsValidator(permissions) {
  return (req, res, next) => {
    const { user } = req;
    if (
      permissions === PUBLIC ||
      (user && permissions.value <= getRoleValue(user.role))
    ) {
      return next();
    }
    return res
      .status(403)
      .send({ message: "You don't have permission for this action" });
  };
}

export default permissionsValidator;
