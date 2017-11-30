import userController from '../controllers/userController';
import permissions from '../../../constants/permissions';

import { Route, addRoutes } from '../../../utils/routes';

const router = addRoutes([
  Route.get('/', userController, userController.readAll, permissions.USER),
  Route.post('/', userController, userController.create, permissions.ADMIN),
  Route.get('/:id', userController, userController.readById, permissions.USER),
  Route.put(
    '/:id',
    userController,
    userController.updateById,
    permissions.ADMIN
  ),
  Route.delete(
    '/:id',
    userController,
    userController.deleteById,
    permissions.ADMIN
  ),
  Route.get(
    '/get/:name',
    userController,
    userController.readByName,
    permissions.USER
  )
]);

export default router;
