import { Router } from 'express';
import geocoderController from '../controllers/geocoderController';
import permissions from '../../../constants/permissions';
import { Route, addRoutes } from '../../../utils/routes';

const router = Router();

addRoutes(router)([
  Route.get(
    '/:address',
    geocoderController,
    geocoderController.addressToCoordinates,
    permissions.USER
  ),
  Route.get(
    '/:lat/:lon',
    geocoderController,
    geocoderController.coordinatesToAddress,
    permissions.USER
  )
]);

export default router;
