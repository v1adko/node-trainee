import userProfileController from '../controllers/userProfileController';
import Router from '../../utils/Router';
import permissions from '../../config/permissions';

const router = new Router();

router.get('/', permissions.USER, userProfileController.readMyProfile);

router.put(
  '/changepassword',
  permissions.USER,
  userProfileController.changePassword
);

export default router;
