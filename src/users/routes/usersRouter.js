import userController from '../controllers/userController';
import Router from '../../utils/Router';
import permissions from '../../config/permissions';

const router = new Router();

router.get('/', permissions.USER, userController.readAll);

router.post('/', permissions.ADMIN, userController.create);

router.get('/:id', permissions.USER, userController.readById);

router.put('/:id', permissions.ADMIN, userController.updateById);

router.delete('/:id', permissions.ADMIN, userController.deleteById);

router.get('/get/:name', permissions.USER, userController.readByName);

export default router;
