import { Router } from 'express';
import permissionsValidator from '../validators';

const methods = ['post', 'get', 'put', 'delete'];

class ExtendRouter {
  constructor() {
    let router = Router();

    router = this.setMethods(router);

    return router;
  }

  setMethods(router) {
    const modifyRouter = router;
    methods.forEach((method) => {
      modifyRouter[method] = this.setMethod(method);
    });
    return modifyRouter;
  }

  setMethod = (method) => {
    function setMethod(path, permissionLevel, ...args) {
      const route = this.route(path);
      let permissionsMiddleware = null;
      if (typeof permissionLevel === 'function') {
        permissionsMiddleware = permissionLevel;
      } else {
        permissionsMiddleware = permissionsValidator(permissionLevel);
      }
      route[method](permissionsMiddleware);
      route[method](args);
      return this;
    }

    return setMethod;
  };
}

export default ExtendRouter;
