const { geolocationService: geocoder } = require('../services');

class GeocoderController {
  constructor() {
    this.addressToCoordinations = (req, res) => {
      geocoder.addressToCoordinations(req.params.address)
        .then(coordinations => res.json(coordinations))
        .catch(err => res.json({ message: err.message }));
    };

    this.coordinationsToAddress = (req, res) => {
      geocoder.coordinationsToAddress(req.params.lat, req.params.lon)
        .then(address => res.json(address))
        .catch(err => res.json({ message: err.message }));
    };
  }
}

module.exports = new GeocoderController();
