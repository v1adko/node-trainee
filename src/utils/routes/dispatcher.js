import permissionValidator from '../../validators';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    const { permissionRules } = controller;
    if (permissionRules) {
      await permissionValidator(
        permissionRules[controllerMethod.name],
        request
      );
    }
    await controllerMethod.call(controller, request, response);
  } catch (err) {
    next(err);
  }
};

export default dispatcher;
