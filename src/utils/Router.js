import { Router } from 'express';
import permissionsValidator from '../validators';

class ExtendRouter {
  constructor() {
    this.innerRouter = new Router();
    this.router = new Router();

    this.setMethods(this.router);
    this.innerRouter.stack = this.router.stack;
    return this.router;
  }

  setMethods(router) {
    const modifyRouter = router;
    modifyRouter.get = this.get.bind(this);
    modifyRouter.post = this.post.bind(this);
    modifyRouter.put = this.put.bind(this);
    modifyRouter.delete = this.delete.bind(this);
  }

  get(route, permissionLevel, ...args) {
    this.innerRouter.get(route, permissionsValidator(permissionLevel));
    this.innerRouter.get(route, ...args);
  }

  post(route, permissionLevel, ...args) {
    this.innerRouter.post(route, permissionsValidator(permissionLevel));
    this.innerRouter.post(route, ...args);
  }

  put(route, permissionLevel, ...args) {
    this.innerRouter.put(route, permissionsValidator(permissionLevel));
    this.innerRouter.put(route, ...args);
  }

  delete = (route, permissionLevel, ...args) => {
    this.innerRouter.delete(route, permissionsValidator(permissionLevel));
    this.innerRouter.delete(route, ...args);
  };
}

export default ExtendRouter;
