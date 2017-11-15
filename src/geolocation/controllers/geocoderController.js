import { geolocationService as geocoder } from '../services';

class GeocoderController {
  addressToCoordinates = (request, response) =>
    geocoder
      .addressToCoordinates(request.params.address)
      .then(coordinates => response.json(coordinates))
      .catch(error => response.json({ message: error.message }));

  coordinatesToAddress = (request, response) =>
    geocoder
      .coordinatesToAddress(request.params.lat, request.params.lon)
      .then(address => response.json(address))
      .catch(error => response.json({ message: error.message }));
}

export default new GeocoderController();
