import userProfileController from '../controllers/userProfileController';
import permissions from '../../../constants/permissions';
import { Route, addRoutes } from '../../../utils/routes';

const router = addRoutes([
  Route.get(
    '/',
    userProfileController,
    userProfileController.readMyProfile,
    permissions.USER
  ),
  Route.put(
    '/changepassword',
    userProfileController,
    userProfileController.changePassword,
    permissions.USER
  )
]);

export default router;
