const { geolocationService: geocoder } = require('../services');

class GeocoderController {
  constructor() {
    this.addressToCoordinates = (req, res) => {
      geocoder.addressToCoordinates(req.params.address)
        .then(coordinates => res.json(coordinates))
        .catch(err => res.json({ message: err.message }));
    };

    this.coordinatesToAddress = (req, res) => {
      geocoder.coordinatesToAddress(req.params.lat, req.params.lon)
        .then(address => res.json(address))
        .catch(err => res.json({ message: err.message }));
    };
  }
}

module.exports = new GeocoderController();
