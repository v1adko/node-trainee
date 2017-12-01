import permissionValidator from '../validators';
import requestValidator from '../../lib/validators/request-validator';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    const { permissionRules, validationSchema } = controller;
    if (permissionRules) {
      await permissionValidator(
        permissionRules[controllerMethod.name],
        request
      );
    }
    if (validationSchema) {
      await requestValidator(permissionRules[controllerMethod.name], request);
    }
    await controllerMethod.call(controller, request, response);
  } catch (err) {
    next(err);
  }
};

export default dispatcher;
