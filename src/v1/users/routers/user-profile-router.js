import userProfileController from '../controllers/user-profile-controller';
import { Route, addRoutes } from '../../../lib/routes';

const router = addRoutes([
  Route.get('/', userProfileController, userProfileController.readMyProfile),
  Route.put(
    '/changepassword',
    userProfileController,
    userProfileController.changePassword
  )
]);

export default router;
