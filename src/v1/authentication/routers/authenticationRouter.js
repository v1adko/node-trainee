import '../config/passport';

import authenticationController from '../controllers/authenticationController';
import { Route, addRoutes } from '../../../utils/routes';

const router = addRoutes([
  Route.post(
    '/register',
    authenticationController,
    authenticationController.register
  ),
  Route.post('/login', authenticationController, authenticationController.login)
]);
export default router;
