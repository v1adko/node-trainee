import { Router } from 'express';

import '../config/passport';

import authenticationController from '../controllers/authenticationController';
import checkAuthField from '../middlewares/checkAuthField';
import genericController from '../../../utils/routes/genericController';
import permissions from '../../../constants/permissions';

const router = Router();

router.post(
  '/register',
  checkAuthField,
  genericController(
    permissions.PUBLIC,
    authenticationController,
    authenticationController.register
  )
);

router.post(
  '/login',
  checkAuthField,
  genericController(
    permissions.PUBLIC,
    authenticationController,
    authenticationController.login
  )
);

export default router;
