const { Router } = require('express');

const router = Router();

const geocoderController = require('../controllers/geocoderController');

router.get('/:address', geocoderController.addressToCoordinations);
router.get('/:lat/:lon', geocoderController.coordinationsToAddress);

module.exports = router;

