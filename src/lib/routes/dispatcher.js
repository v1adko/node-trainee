import { permissionsValidator, requestValidator } from '../validators';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    const { permissionRules, validationRules } = controller;

    if (validationRules) {
      await requestValidator(validationRules[controllerMethod.name], request);
    }

    if (permissionRules) {
      await permissionsValidator(
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
