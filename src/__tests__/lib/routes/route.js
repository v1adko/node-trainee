import Route from '../../../lib/routes/route';

function TestController() {}

function testControllerMethod() {}

const route = '/testRoute';
const controller = TestController;
const controllerMethod = testControllerMethod;

describe('Test Route', () => {
  it('should get route params for get method and return object with it', async () => {
    const {
      method,
      route: returnedRoute,
      controller: returnedController,
      controllerMethod: returnedControllerMethod
    } = Route.get(route, controller, controllerMethod);
    expect(method).toBe('get');
    expect(returnedRoute).toBe(route);
    expect(returnedController).toBe(controller);
    expect(returnedControllerMethod).toBe(controllerMethod);
  });

  it('should get route params for post method and return object with it', async () => {
    const {
      method,
      route: returnedRoute,
      controller: returnedController,
      controllerMethod: returnedControllerMethod
    } = Route.post(route, controller, controllerMethod);
    expect(method).toBe('post');
    expect(returnedRoute).toBe(route);
    expect(returnedController).toBe(controller);
    expect(returnedControllerMethod).toBe(controllerMethod);
  });

  it('should get route params for put method and return object with it', async () => {
    const {
      method,
      route: returnedRoute,
      controller: returnedController,
      controllerMethod: returnedControllerMethod
    } = Route.put(route, controller, controllerMethod);
    expect(method).toBe('put');
    expect(returnedRoute).toBe(route);
    expect(returnedController).toBe(controller);
    expect(returnedControllerMethod).toBe(controllerMethod);
  });

  it('should get route params for delete method and return object with it', async () => {
    const {
      method,
      route: returnedRoute,
      controller: returnedController,
      controllerMethod: returnedControllerMethod
    } = Route.delete(route, controller, controllerMethod);
    expect(method).toBe('delete');
    expect(returnedRoute).toBe(route);
    expect(returnedController).toBe(controller);
    expect(returnedControllerMethod).toBe(controllerMethod);
  });
});
