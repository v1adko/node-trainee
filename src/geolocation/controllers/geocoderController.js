import { geolocationService as geocoder } from '../services';

let instance = null;
class GeocoderController {
  constructor(service) {
    if (!instance) instance = this;
    this.service = service;
  }

  addressToCoordinates = async function getCoordinates(request, response) {
    const { address } = request.params;
    const result = await instance.service.addressToCoordinates(address);
    return response.json(result);
  };

  coordinatesToAddress = async function getAddress(request, response) {
    const { lat, lon } = request.params;
    const result = await instance.service.coordinatesToAddress(lat, lon);
    return response.json(result);
  };
}

export default new GeocoderController(geocoder);
