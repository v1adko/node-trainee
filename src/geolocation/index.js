const express = require('express');

const router = express.Router();

const geoMiddleware = require('./middleware');
const geocoder = require('./controllers');

router.get('/:address', geoMiddleware.addressToCoordinations);
router.get('/:lat/:lon', geoMiddleware.coordinationsToAddress);

module.exports.router = router;
module.exports.geocoder = geocoder;
