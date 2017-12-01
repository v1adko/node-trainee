const requestValidationDecorator = validationSchema => TargetClass =>
  class RequestValidationWrapper extends TargetClass {
    validationSchema = validationSchema;
  };

export default requestValidationDecorator;
