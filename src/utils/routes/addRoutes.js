import { Router } from 'express';
import dispatcher from './dispatcher';

const addRoutes = (routes) => {
  const router = new Router();

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
