import geocoderController from './geocoder-controller';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes([
  Route.get(
    '/:address',
    geocoderController,
    geocoderController.addressToCoordinates
  ),
  Route.get(
    '/:lat/:lon',
    geocoderController,
    geocoderController.coordinatesToAddress
  )
]);

export default router;
