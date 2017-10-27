const authMiddleware = require('../middleware/authentication');
const crudMiddleware = require('../middleware/crud');

const express = require('express');

const router = express.Router();

router.post('/register', authMiddleware.register);

router.post('/login', authMiddleware.login);

router.get('/logout', authMiddleware.logout);

router.get('/', crudMiddleware.getAll);

router.get('/id/:id', crudMiddleware.getById);

router.put('/id/:id', crudMiddleware.update);

router.get('/username/:username', crudMiddleware.getByName);

module.exports = router;
