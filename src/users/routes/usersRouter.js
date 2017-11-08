const { userController } = require('../controllers');
const verifyTokken = require('../middlewares/verifyToken');

const { Router } = require('express');

const router = Router();

router.get('/', verifyTokken, userController.readAll);

router.post('/', verifyTokken, userController.create);

router.get('/:id', verifyTokken, userController.readById);

router.put('/:id', verifyTokken, userController.updateById);

router.delete('/:id', verifyTokken, userController.deleteById);

router.get('/get/:name', verifyTokken, userController.readByName);

module.exports = router;
