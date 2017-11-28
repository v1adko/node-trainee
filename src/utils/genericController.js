import permissionValidator from '../validators';

const genericController = (permission, controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    await permissionValidator(permission, request);
    await controllerMethod.call(controller, request, response);
  } catch (err) {
    next(err);
  }
};

export default genericController;
