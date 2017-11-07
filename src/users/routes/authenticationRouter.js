const { authenticationController } = require('../controllers');
const verifyTokken = require('../middlewares/verifyToken');
const checkAuthField = require('../middlewares/checkAuthField');

const { Router } = require('express');

const router = Router();

router.post('/register', checkAuthField, authenticationController.register);

router.post('/login', checkAuthField, authenticationController.login);

router.put('/changepass', verifyTokken, authenticationController.changePassword);

module.exports = router;
