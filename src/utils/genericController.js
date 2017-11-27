import permissionValidator from '../validators';

const genericController = (permission, controllerMethod) => async (
  request,
  response,
  next
) => {
  try {
    await permissionValidator(permission, request);
    await controllerMethod(request, response);
  } catch (err) {
    next(err);
  }
};

export default genericController;
