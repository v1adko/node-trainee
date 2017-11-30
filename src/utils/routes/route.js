import HTTP_METHODS from '../../constants/httpMethods';

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

  static get = (...arg) => Route.factory(HTTP_METHODS.GET, ...arg);
  static post = (...arg) => Route.factory(HTTP_METHODS.POST, ...arg);
  static put = (...arg) => Route.factory(HTTP_METHODS.PUT, ...arg);
  static delete = (...arg) => Route.factory(HTTP_METHODS.DELETE, ...arg);
}

export default Route;
