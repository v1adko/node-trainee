import { Router } from 'express';
import userProfileController from '../controllers/userProfileController';
import genericController from '../../../utils/genericController';
import permissions from '../../../constants/permissions';

const router = new Router();

router.get(
  '/',
  genericController(permissions.USER, userProfileController.readMyProfile)
);

router.put(
  '/changepassword',
  genericController(permissions.USER, userProfileController.changePassword)
);

export default router;
