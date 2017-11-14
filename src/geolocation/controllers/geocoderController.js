import { geolocationService as geocoder } from '../services';

class GeocoderController {
  addressToCoordinates = (req, res) => {
    geocoder.addressToCoordinates(req.params.address)
      .then(coordinates => res.json(coordinates))
      .catch(err => res.json({ message: err.message }));
  }

  coordinatesToAddress = (req, res) => {
    geocoder.coordinatesToAddress(req.params.lat, req.params.lon)
      .then(address => res.json(address))
      .catch(err => res.json({ message: err.message }));
  }
}

// module.exports = new GeocoderController();
export default new GeocoderController();
