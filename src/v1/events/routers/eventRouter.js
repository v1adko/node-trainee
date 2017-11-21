import { Router } from 'express';
import eventController from '../controllers/eventController';

const router = Router();

router.post('/', eventController.create);

router.get('/', eventController.readAll);

export default router;
