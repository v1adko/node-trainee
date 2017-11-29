import { Router } from 'express';
import eventController from '../controllers/eventController';
import permissions from '../../../constants/permissions';

import { Route, addRoutes } from '../../../utils/routes';

const router = Router();

addRoutes(router)([
  Route.get('/', eventController, eventController.readAll, permissions.USER),
  Route.post('/', eventController, eventController.create, permissions.USER)
]);

export default router;
