const { Router } = require('express');

const router = Router();

const ctrl = require('../controllers');

router.get('/:address', ctrl.addressToCoordinations);
router.get('/:lat/:lon', ctrl.coordinationsToAddress);

module.exports = router;

