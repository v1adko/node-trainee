function setPermissions(controllerClass, permissions) {
  const decoratedController = controllerClass;
  decoratedController.permissions = permissions;
}

export default setPermissions;
