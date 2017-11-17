import { Router } from 'express';
import { userController } from '../controllers';
import verifyTokken from '../middlewares/verifyToken';

import permissionsValidator from '../middlewares/permissionsValidator';
import permissions from '../config/permissions';

const router = Router();

router.get(
  '/',
  verifyTokken,
  permissionsValidator([permissions.READ_USER]),
  userController.readAll
);

router.post(
  '/',
  verifyTokken,
  permissionsValidator([permissions.CREATE_USER]),
  userController.create
);

router.get(
  '/:id',
  verifyTokken,
  permissionsValidator([permissions.READ_USER, permissions.GET_MY_DATE]),
  userController.readById
);

router.put(
  '/:id',
  verifyTokken,
  permissionsValidator([permissions.UPDATE_USER, permissions.UPDATE_MY_DATE]),
  userController.updateById
);

router.delete(
  '/:id',
  verifyTokken,
  permissionsValidator([permissions.DELETE_USER]),
  userController.deleteById
);

router.get(
  '/get/:name',
  verifyTokken,
  permissionsValidator([permissions.READ_USER]),
  userController.readByName
);

export default router;
