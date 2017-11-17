import permissionsConst from '../config/permissions';

function checkRestrict(user, permission, params) {
  switch (permission) {
    case permissionsConst.GET_MY_DATE || permissionsConst.UPDATE_MY_DATE:
      return params.id === user.id;
    default:
      return true;
  }
}

function checkPermission(user, permission, params) {
  if (user) {
    if (user.permissions) {
      if (user.permissions.includes(permission)) {
        return checkRestrict(user, permission, params);
      }
    }
    return false;
  }
  throw new Error('User not found. Maybe you forgot doing token verification');
}

function permissionsValidator(permissions) {
  return (req, res, next) => {
    for (let i = 0; i < permissions.length; i += 1) {
      if (checkPermission(req.user, permissions[i], req.params)) {
        return next();
      }
    }
    return res
      .status(403)
      .send({ message: "You don't have permission for this action" });
  };
}

export default permissionsValidator;
