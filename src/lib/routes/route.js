import HTTP_METHODS from '../../constants/http-methods';

class Route {
  static makeHTTPMethod = (method, route, controller, controllerMethod) => ({
    method,
    route,
    controller,
    controllerMethod
  });

  static get = (...arg) => Route.makeHTTPMethod(HTTP_METHODS.GET, ...arg);
  static post = (...arg) => Route.makeHTTPMethod(HTTP_METHODS.POST, ...arg);
  static put = (...arg) => Route.makeHTTPMethod(HTTP_METHODS.PUT, ...arg);
  static delete = (...arg) => Route.makeHTTPMethod(HTTP_METHODS.DELETE, ...arg);
}

export default Route;
