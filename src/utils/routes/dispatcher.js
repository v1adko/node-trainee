import permissionValidator from '../../validators';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    const { permissions } = controller;
    if (permissions) {
      await permissionValidator(permissions[controllerMethod.name], request);
    }
    await controllerMethod.call(controller, request, response);
  } catch (err) {
    next(err);
  }
};

export default dispatcher;
