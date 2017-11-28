import { Router } from 'express';
import eventController from '../controllers/eventController';
import genericController from '../../../utils/genericController';
import permissions from '../../../constants/permissions';

const router = Router();

router.post(
  '/',
  genericController(permissions.USER, eventController, eventController.create)
);

router.get(
  '/',
  genericController(permissions.USER, eventController, eventController.readAll)
);

export default router;
