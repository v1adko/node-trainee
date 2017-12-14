import addRoutes from '../../../lib/routes//add-routes';

function testController() {}

function controllerMethod() {}

const routeConfig = [
  {
    method: 'get',
    route: '/firstTestRoute',
    testController,
    controllerMethod
  },
  {
    method: 'post',
    route: '/secondTestRoute',
    testController,
    controllerMethod
  }
];

describe('Test getRequestData', () => {
  it('should destruct and return all data of request', () => {
    const commonRouter = addRoutes(routeConfig);

    expect(commonRouter).toMatchSnapshot();
  });
});
