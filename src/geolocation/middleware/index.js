const ctrl = require('../controllers');

const addressToCoordinations = (req, res) => {
  ctrl.addressToCoordinations(req.params.address)
    .then(coordinations => res.json(coordinations))
    .catch(err => res.json({ message: err.message }));
};


const coordinationsToAddress = (req, res) => {
  ctrl.coordinationsToAddress(req.params.lat, req.params.lon)
    .then(address => res.json(address))
    .catch(err => res.json({ message: err.message }));
};

module.exports = {
  addressToCoordinations,
  coordinationsToAddress
};
