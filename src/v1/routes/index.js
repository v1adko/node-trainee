import { Router } from 'express';
import { geolocationRouter } from '../geolocation';
import eventsRouter from '../events';
import { authenticationRouter, usersRouter, userProfileRouter } from '../users';

const router = Router();

router.use('/authentication', authenticationRouter);
router.use('/myprofile', userProfileRouter);
router.use('/geolocation', geolocationRouter);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);

export default router;
