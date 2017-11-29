import dispatcher from './dispatcher';

const addRoutes = router => (routes) => {
  routes.forEach((routeConfig) => {
    const {
      method,
      route,
      controller,
      controllerMethod,
      permission
    } = routeConfig;

    router[method](route, dispatcher(controller, controllerMethod, permission));
  });
  return router;
};

export default addRoutes;
