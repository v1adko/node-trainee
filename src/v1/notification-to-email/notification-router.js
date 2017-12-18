import notificationController from './notification-controller';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes([
  Route.get(
    '/nearestATMs',
    notificationController,
    notificationController.getNearestATM
  )
]);

export default router;
