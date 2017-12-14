import { Router } from 'express';
import { geolocationRouter } from '../geolocation';
import eventsRouter from '../events';
import authenticationRouter from '../authentication/authentication-router';
import usersRouter from '../users/routers/users-router';
import userProfileRouter from '../users/routers/user-profile-router';

import '../atm';

const router = Router();

router.use('/authentication', authenticationRouter);
router.use('/myprofile', userProfileRouter);
router.use('/geolocation', geolocationRouter);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);

export default router;
