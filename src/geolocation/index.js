const express = require('express');

const router = express.Router();

const { addressToCoordinations, coordinationsToAddress } = require('./controllers');
const geocoder = require('./services');

router.get('/:address', addressToCoordinations);
router.get('/:lat/:lon', coordinationsToAddress);

module.exports.router = router;
module.exports.geocoder = geocoder;
