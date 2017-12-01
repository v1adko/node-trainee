import userController from '../controllers/userController';
import { Route, addRoutes } from '../../../utils/routes';

const router = addRoutes([
  Route.get('/', userController, userController.readAll),
  Route.post('/', userController, userController.create),
  Route.get('/:id', userController, userController.readById),
  Route.put('/:id', userController, userController.updateById),
  Route.delete('/:id', userController, userController.deleteById),
  Route.get('/get/:name', userController, userController.readByName)
]);

export default router;
