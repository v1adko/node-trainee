import { permissionsValidator, requestValidator } from '../validators';
import setRequestData from './setRequestData';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    const { permissionRules, validationRules } = controller;

    // Get all request data and setup it in data param of request
    setRequestData(request);

    // Do request validation by schemas from validationRules
    if (validationRules) {
      await requestValidator(validationRules[controllerMethod.name], request);
    }

    // Rewrite all request data and setup it in data param of request after Joi validation
    setRequestData(request);

    // Do permission validation by rules from permissionRules
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
