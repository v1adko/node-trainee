const { Router } = require('express');

const router = Router();

const geocoderController = require('../controllers/geocoderController');

router.get('/:address', geocoderController.addressToCoordinates);
router.get('/:lat/:lon', geocoderController.coordinatesToAddress);

module.exports = router;

