import { permissionsValidator, requestValidator } from '../validators';
import getRequestData from './get-request-data';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    const { permissionRules, validationRules } = controller;

    // Get all request data and setup it in data param of request
    request.data = getRequestData(request);

    // Do request validation by schemas from validationRules
    if (validationRules) {
      request.data = await requestValidator(
        validationRules[controllerMethod.name],
        request
      );
    }

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
