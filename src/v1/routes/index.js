import { Router } from 'express';
import { geolocationRouter } from '../geolocation';
import eventsRouter from '../events';
import authenticationRouter from '../users/routes/authenticationRouter';
import usersRouter from '../users/routes/usersRouter';
import userProfileRouter from '../users/routes/userProfileRouter';

const router = Router();

router.use('/authentication', authenticationRouter);
router.use('/myprofile', userProfileRouter);
router.use('/geolocation', geolocationRouter);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);

export default router;
