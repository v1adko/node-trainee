<<<<<<< 33dc772e206ab9b4b5d6cda4920e2da53b32f7be
const authenticationRouter = require('./authenticationRouter');
const usersRouter = require('./usersRouter');

module.exports = {
  authenticationRouter,
  usersRouter
};
=======
let authMiddleware = require('../middleware/authentication');
let crudMiddleware = require('../middleware/crudUser');

const express = require('express');

const router = express.Router();

router.post('/register', authMiddleware.register);

router.post('/login', authMiddleware.login);

router.post('/isLogined', authMiddleware.isLogined);

router.put('/:id/changepass', authMiddleware.changePassword);


router.get('/', crudMiddleware.getAll);

router.get('/:id', crudMiddleware.getById);

module.exports = router;
>>>>>>> done refactor and added some feature
