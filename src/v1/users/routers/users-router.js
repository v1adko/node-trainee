import userController from '../controllers/user-controller';
import { Route, addRoutes } from '../../../lib/routes';

const router = addRoutes([
  Route.get('/', userController, userController.readAll),
  Route.post('/', userController, userController.create),
  Route.get('/:id', userController, userController.readById),
  Route.put('/:id', userController, userController.updateById),
  Route.delete('/:id', userController, userController.deleteById),
  Route.get('/get/:name', userController, userController.readByName) // TODO: Rewrite it to method with query params for all fields
]);

export default router;
