import eventController from '../controllers/eventController';

import { Route, addRoutes } from '../../../utils/routes';

const router = addRoutes([
  Route.get('/', eventController, eventController.readAll),
  Route.post('/', eventController, eventController.create)
]);

export default router;
