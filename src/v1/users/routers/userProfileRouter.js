import userProfileController from '../controllers/userProfileController';
import { Route, addRoutes } from '../../../utils/routes';

const router = addRoutes([
  Route.get('/', userProfileController, userProfileController.readMyProfile),
  Route.put(
    '/changepassword',
    userProfileController,
    userProfileController.changePassword
  )
]);

export default router;
