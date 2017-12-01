import eventController from './event-controller';

import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes([
  Route.get('/', eventController, eventController.readAll),
  Route.post('/', eventController, eventController.create)
]);

export default router;
