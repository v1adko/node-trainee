import { geolocationService as geocoder } from '../services';
import permissions from '../../../constants/permissions';

class GeocoderController {
  constructor(service) {
    this.service = service;
    this.addressToCoordinates.permissionLevel = permissions.USER;
    this.coordinatesToAddress.permissionLevel = permissions.USER;
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
