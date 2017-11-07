const services = require('../services');

const addressToCoordinations = (req, res) => {
  services.addressToCoordinations(req.params.address)
    .then(coordinations => res.json(coordinations))
    .catch(err => res.json({ message: err.message }));
};


const coordinationsToAddress = (req, res) => {
  services.coordinationsToAddress(req.params.lat, req.params.lon)
    .then(address => res.json(address))
    .catch(err => res.json({ message: err.message }));
};

module.exports = {
  addressToCoordinations,
  coordinationsToAddress
};
