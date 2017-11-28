import { Router } from 'express';
import geocoderController from '../controllers/geocoderController';
import genericController from '../../../utils/genericController';
import permissions from '../../../constants/permissions';

const router = Router();

router.get(
  '/:address',
  genericController(
    permissions.USER,
    geocoderController,
    geocoderController.addressToCoordinates
  )
);

router.get(
  '/:lat/:lon',
  genericController(
    permissions.USER,
    geocoderController,
    geocoderController.coordinatesToAddress
  )
);

export default router;
