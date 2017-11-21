import { geolocationService as geocoder } from '../services';

class GeocoderController {
  constructor(service) {
    this.service = service;

    this.addressToCoordinates = this.addressToCoordinates.bind(this);
    this.coordinatesToAddress = this.coordinatesToAddress.bind(this);
  }

  async addressToCoordinates(request, response) {
    const { address } = request.params;
    const result = await this.service.addressToCoordinates(address);
    return response.json(result);
  }

  async coordinatesToAddress(request, response) {
    const { lat, lon } = request.params;
    const result = await this.service.coordinatesToAddress(lat, lon);
    return response.json(result);
  }
}

export default new GeocoderController(geocoder);
