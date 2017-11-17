import { Router } from 'express';

import { authenticationController } from '../controllers';
import verifyTokken from '../middlewares/verifyToken';
import checkAuthField from '../middlewares/checkAuthField';

const router = Router();

router.post('/register', checkAuthField, authenticationController.register);

router.post('/login', checkAuthField, authenticationController.login);

router.put(
  '/changepass',
  verifyTokken,
  authenticationController.changePassword
);

export default router;
