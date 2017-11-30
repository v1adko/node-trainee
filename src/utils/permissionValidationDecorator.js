const permissionValidationDecorator = permissionRules => TargetClass =>
  class PermissionValidationWrapper extends TargetClass {
    permissionRules = permissionRules;
  };

export default permissionValidationDecorator;
