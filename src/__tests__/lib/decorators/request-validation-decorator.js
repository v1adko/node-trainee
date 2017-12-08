import Joi from 'joi';
import requestValidation from '../../../lib/decorators/request-validation-decorator';

const TEST_STRING = 'testSting';

const testFieldSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();

const testShema = Joi.object().keys({
  testField: testFieldSchema
});

const validationRules = {
  testMethod: testShema
};

class TestController {
  constructor(testField) {
    this.testField = testField;
  }
  testMethod = () => `${this.testField}user`;
}

describe('Test requestValidationDecorator', () => {
  it('should decorate controller and return enhanced controller class', () => {
    const testController = new TestController(TEST_STRING);
    const EnhancedTestController = requestValidation(validationRules)(
      TestController
    );
    const enhancedTestController = new EnhancedTestController(TEST_STRING);
    const {
      testField,
      validationRules: rules,
      testMethod
    } = enhancedTestController;

    expect(enhancedTestController).toBeInstanceOf(TestController);
    expect(testField).toBe(TEST_STRING);
    expect(rules).toBe(validationRules);
    expect(testMethod()).toBe(testController.testMethod());
  });
});
