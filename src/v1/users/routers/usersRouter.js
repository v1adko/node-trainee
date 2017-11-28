import { Router } from 'express';
import userController from '../controllers/userController';
import genericController from '../../../utils/genericController';
import permissions from '../../../constants/permissions';

const router = new Router();

router.get(
  '/',
  genericController(permissions.USER, userController, userController.readAll)
);

router.post(
  '/',
  genericController(permissions.ADMIN, userController, userController.create)
);

router.get(
  '/:id',
  genericController(permissions.USER, userController, userController.readById)
);

router.put(
  '/:id',
  genericController(
    permissions.ADMIN,
    userController,
    userController.updateById
  )
);

router.delete(
  '/:id',
  genericController(
    permissions.ADMIN,
    userController,
    userController.deleteById
  )
);

router.get(
  '/get/:name',
  genericController(permissions.USER, userController, userController.readByName)
);

export default router;
