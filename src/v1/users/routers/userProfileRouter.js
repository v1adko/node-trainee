import { Router } from 'express';
import userProfileController from '../controllers/userProfileController';
import genericController from '../../../utils/routes/genericController';
import permissions from '../../../constants/permissions';

const router = new Router();

router.get(
  '/',
  genericController(
    permissions.USER,
    userProfileController,
    userProfileController.readMyProfile
  )
);

router.put(
  '/changepassword',
  genericController(
    permissions.USER,
    userProfileController,
    userProfileController.changePassword
  )
);

export default router;
