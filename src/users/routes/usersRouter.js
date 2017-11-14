import { Router } from 'express';

import { userController } from '../controllers';
import verifyTokken from '../middlewares/verifyToken';

const router = Router();

router.get('/', verifyTokken, userController.readAll);

router.post('/', verifyTokken, userController.create);

router.get('/:id', verifyTokken, userController.readById);

router.put('/:id', verifyTokken, userController.updateById);

router.delete('/:id', verifyTokken, userController.deleteById);

router.get('/get/:name', verifyTokken, userController.readByName);

export default router;
