function setPermissions(controllerClass, permissions) {
  const decorationController = controllerClass;
  decorationController.permissions = permissions;
}

export default setPermissions;
