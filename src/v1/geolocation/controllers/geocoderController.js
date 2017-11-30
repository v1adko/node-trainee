import { geolocationService as geocoder } from '../services';
import permissions from '../../../constants/permissions';
import setPermissions from '../../../utils/setPermissions';

const methodPermissions = {
  addressToCoordinates: permissions.USER,
  coordinatesToAddress: permissions.USER
};

class GeocoderController {
  constructor(service) {
    this.service = service;
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
const geocoderController = new GeocoderController(geocoder);
setPermissions(geocoderController, methodPermissions);

export default geocoderController;
