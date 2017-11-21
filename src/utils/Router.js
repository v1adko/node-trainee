import { Router } from 'express';
import permissionsValidator from '../validators';

class ExtendRouter {
  constructor() {
    const router = Router();

    router.get = this.get;
    router.post = this.post;
    router.put = this.put;
    router.delete = this.delete;

    return router;
  }

  get(path, permissionLevel, ...args) {
    const route = this.route(path);
    const permissionsMiddleware = permissionsValidator(permissionLevel);
    route.get(permissionsMiddleware);
    route.get(args);
    return this;
  }

  post(path, permissionLevel, ...args) {
    const route = this.route(path);
    const permissionsMiddleware = permissionsValidator(permissionLevel);
    route.post(permissionsMiddleware);
    route.post(args);
    return this;
  }

  put(path, permissionLevel, ...args) {
    const route = this.route(path);
    const permissionsMiddleware = permissionsValidator(permissionLevel);
    route.put(permissionsMiddleware);
    route.put(args);
    return this;
  }

  delete(path, permissionLevel, ...args) {
    const route = this.route(path);
    const permissionsMiddleware = permissionsValidator(permissionLevel);
    route.delete(permissionsMiddleware);
    route.delete(args);
    return this;
  }
}

export default ExtendRouter;
