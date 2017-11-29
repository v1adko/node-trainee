import genericController from './genericController';

class Route {
  static get(route, controller, controllerMethod, permission) {
    return router =>
      router.get(
        route,
        genericController(permission, controller, controllerMethod)
      );
  }

  static post(route, controller, controllerMethod, permission) {
    return router =>
      router.post(
        route,
        genericController(permission, controller, controllerMethod)
      );
  }

  static put(route, controller, controllerMethod, permission) {
    return router =>
      router.put(
        route,
        genericController(permission, controller, controllerMethod)
      );
  }

  static delete(route, controller, controllerMethod, permission) {
    return router =>
      router.delete(
        route,
        genericController(permission, controller, controllerMethod)
      );
  }
}

export default Route;
