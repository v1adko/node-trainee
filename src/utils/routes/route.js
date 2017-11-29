import genericController from './genericController';

class Route {
  static factory(method, route, controller, controllerMethod, permission) {
    return router =>
      router[method](
        route,
        genericController(permission, controller, controllerMethod)
      );
  }

  static get = (...arg) => Route.factory('get', ...arg);
  static post = (...arg) => Route.factory('post', ...arg);
  static put = (...arg) => Route.factory('put', ...arg);
  static delete = (...arg) => Route.factory('delete', ...arg);
}

export default Route;
