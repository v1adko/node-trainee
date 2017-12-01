import permissionValidation from '../utils/permissionValidationDecorator';
import permissions from '../constants/permissions';

const TEST_STRING = 'testSting';

const permissionRules = {
  userMethod: permissions.USER,
  adminMethod: permissions.ADMIN
};

class TestController {
  constructor(testField) {
    this.testField = testField;
  }
  userMethod = () => `${this.testField}user`;
  adminMethod = () => `${this.testField}admin`;
}

describe('Test permissionValidationDecorator', () => {
  it('should decorate controller and return enhanced controller class', () => {
    const testController = new TestController(TEST_STRING);
    const EnhancedTestController = permissionValidation(permissionRules)(
      TestController
    );
    const enhancedTestController = new EnhancedTestController(TEST_STRING);
    const {
      testField,
      permissionRules: rules,
      userMethod,
      adminMethod
    } = enhancedTestController;

    expect(enhancedTestController).toBeInstanceOf(TestController);
    expect(testField).toBe(TEST_STRING);
    expect(rules).toBe(permissionRules);
    expect(testController.userMethod()).toBe(userMethod());
    expect(testController.adminMethod()).toBe(adminMethod());
  });
});
