import permissionValidator from '../../validators';

const dispatcher = (controller, controllerMethod, permission) => async (
  request,
  response,
  next
) => {
  try {
    if (permission) {
      await permissionValidator(permission, request);
    }
    await controllerMethod.call(controller, request, response);
  } catch (err) {
    next(err);
  }
};

export default dispatcher;
