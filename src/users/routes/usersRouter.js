import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.get('/', userController.readAll);

router.post('/', userController.create);

router.get('/:id', userController.readById);

router.put('/:id', userController.updateById);

router.delete('/:id', userController.deleteById);

router.get('/get/:name', userController.readByName);

export default router;
