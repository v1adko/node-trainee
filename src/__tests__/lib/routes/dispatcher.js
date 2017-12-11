import getDispatcher from '../../../lib/routes/dispatcher';

let counter = 0;

function TestController() {}

function testControllerMethod() {
  counter += 1;
}

describe('Test dispatcher', () => {
  beforeEach(() => {
    counter = 0;
  });

  it('should return dispatcher and run it', async () => {
    const dispatcher = await getDispatcher(
      TestController,
      testControllerMethod
    );
    await dispatcher({}, {}, () => {});

    expect(counter === 1);
  });

  it('should call request validator if exist validation rules', async () => {
    const dispatcher = await getDispatcher(
      TestController,
      testControllerMethod
    );
    TestController.validationRules = {};
    await dispatcher({}, {}, () => {});

    expect(counter === 1);
  });

  it('should call permissions validator if exist permission rules', async () => {
    const dispatcher = await getDispatcher(
      TestController,
      testControllerMethod
    );
    TestController.permissionRules = {};
    await dispatcher({}, {}, () => {});

    expect(counter === 1);
  });

  it('should throw error', async () => {
    const methodError = new Error('Test error');
    function throwingMethod() {
      throw methodError;
    }
    const dispatcher = await getDispatcher(TestController, throwingMethod);
    await dispatcher({}, {}, (error) => {
      expect(error).toBe(methodError);
    });
    expect(counter === 1);
  });
});
