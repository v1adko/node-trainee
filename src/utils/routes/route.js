class Route {
  static factory = (
    method,
    route,
    controller,
    controllerMethod,
    permission
  ) => ({
    method,
    route,
    controller,
    controllerMethod,
    permission
  });

  static get = (...arg) => Route.factory('get', ...arg);
  static post = (...arg) => Route.factory('post', ...arg);
  static put = (...arg) => Route.factory('put', ...arg);
  static delete = (...arg) => Route.factory('delete', ...arg);
}

export default Route;
