import { Router } from 'express';

import '../config/passport';

import authenticationController from '../controllers/authenticationController';
import checkAuthField from '../middlewares/checkAuthField';

const router = Router();

router.post('/register', checkAuthField, authenticationController.register);

router.post('/login', checkAuthField, authenticationController.login);

export default router;
