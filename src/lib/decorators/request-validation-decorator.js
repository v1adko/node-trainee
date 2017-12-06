const requestValidationDecorator = validationRules => TargetClass =>
  class RequestValidationWrapper extends TargetClass {
    validationRules = validationRules;
  };

export default requestValidationDecorator;
