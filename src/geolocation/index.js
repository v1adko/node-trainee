let express = require('express');
let router = express.Router();

let geoMiddleware = require('./middleware');
let geocoder = require('./controllers');

router.get('/:address', geoMiddleware.addressToCoordination);
router.get('/:lat/:lon', geoMiddleware.coordinationToAddress);

module.exports.router = router;
module.exports.geocoder = geocoder;