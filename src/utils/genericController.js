import getPermissionsValidator from '../validators';

const genericController = (permission, controllerMethod) => {
  const permissionValidator = getPermissionsValidator(permission);
  return async (request, response, next) => {
    try {
      await permissionValidator(request);
      await controllerMethod(request, response);
    } catch (err) {
      next(err);
    }
  };
};

export default genericController;
