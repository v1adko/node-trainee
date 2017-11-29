import genericController from '../utils/genericController';

export class Route {
  static get(route, controller, controllerMethod, permission) {
    return (router) => {
      router.get(
        route,
        genericController(permission, controller, controllerMethod)
      );
      return router;
    };
  }

  static post(route, controller, controllerMethod, permission) {
    return (router) => {
      router.post(
        route,
        genericController(permission, controller, controllerMethod)
      );
      return router;
    };
  }

  static put(route, controller, controllerMethod, permission) {
    return (router) => {
      router.put(
        route,
        genericController(permission, controller, controllerMethod)
      );
      return router;
    };
  }

  static delete(route, controller, controllerMethod, permission) {
    return (router) => {
      router.delete(
        route,
        genericController(permission, controller, controllerMethod)
      );
      return router;
    };
  }
}

export function addRoutes(router) {
  return (routes) => {
    routes.forEach((route) => {
      route(router);
    });
    return router;
  };
}
