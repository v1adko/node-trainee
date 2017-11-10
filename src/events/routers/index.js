const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/', eventController.create);

router.get('/', eventController.readAll);

module.exports = router;
