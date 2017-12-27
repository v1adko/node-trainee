import atmController from './atm-controller';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes([
  Route.get('/nearest', atmController, atmController.getNearest)
]);

export default router;
