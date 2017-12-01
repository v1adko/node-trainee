import { geolocationService as geocoder } from './services';
import permissions from '../../constants/permissions';
import permissionValidation from '../../lib/validation-decorators/permission-validation-decorator';

const permissionRules = {
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

const EnhancedGeocoderController = permissionValidation(permissionRules)(
  GeocoderController
);

export default new EnhancedGeocoderController(geocoder);
