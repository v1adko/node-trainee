import { Router } from 'express';

import geocoderController from '../controllers/geocoderController';

const router = Router();

router.get('/:address', geocoderController.addressToCoordinates);
router.get('/:lat/:lon', geocoderController.coordinatesToAddress);

export default router;

