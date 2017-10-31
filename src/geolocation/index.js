let express = require('express');
let router = express.Router();

let geoMiddleware = require('./middleware');
let geocoder = require('./controllers');

router.get('/:address', geoMiddleware.addressToCoordinations);
router.get('/:lat/:lon', geoMiddleware.coordinationsToAddress);

module.exports.router = router;
module.exports.geocoder = geocoder;