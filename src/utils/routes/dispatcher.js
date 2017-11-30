import permissionValidator from '../../validators';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    if (controller.permissionLevel) {
      await permissionValidator(
        controller.permissionLevel[controllerMethod.name],
        request
      );
    }
    await controllerMethod.call(controller, request, response);
  } catch (err) {
    next(err);
  }
};

export default dispatcher;
