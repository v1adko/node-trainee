const ctrl = require('../controllers');

module.exports.addressToCoordination = (req, res) => {
  ctrl.addressToCoordination(req.params.address)
    .then(coordination => res.json(coordination))
    .catch(err => res.json(err));
}


module.exports.coordinationToAddress = (req, res) => {
  ctrl.coordinationToAddress(req.params.lat, req.params.lon)
    .then(address => res.json(address))
    .catch(err => res.json(err));
}