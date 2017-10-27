let express = require('express');
let router = express.Router();

let geoMiddleware = require('./middleware');

router.get('/', geoMiddleware.doRequest);


module.exports = router;