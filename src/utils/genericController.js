import getPermissionsValidator from '../validators';

const genericController = (permission, controllerMethod) => {
  const permissionValidator = getPermissionsValidator(permission);

  return async (req, res, next) => {
    const doNext = () => controllerMethod(req, res, next);
    try {
      await permissionValidator(req, res, doNext);
    } catch (err) {
      next(err);
    }
  };
};

export default genericController;
