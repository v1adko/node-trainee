function permissionDecorator(controllerClass, permissions) {
  const decorationController = controllerClass;
  decorationController.permissions = permissions;
  return decorationController;
}

export default permissionDecorator;
