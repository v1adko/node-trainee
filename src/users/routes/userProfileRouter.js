import { Router } from 'express';
import { userProfileController } from '../controllers';

const router = Router();

router.get('/', userProfileController.readMyProfile);

router.put('/changepassword', userProfileController.changePassword);

export default router;
