import R from 'ramda';
import { geolocationService as geocoder } from '../services';
import permissions from '../../../constants/permissions';
import permissionValidation from '../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import {
  addressToCoordinatesSchema,
  coordinatesToAddressSchema
} from './schema-validation';

const permissionRules = {
  addressToCoordinates: permissions.USER,
  coordinatesToAddress: permissions.USER
};

const validationRules = {
  addressToCoordinates: addressToCoordinatesSchema,
  coordinatesToAddress: coordinatesToAddressSchema
};

class GeocoderController {
  constructor(service) {
    this.service = service;
  }

  async addressToCoordinates(request, response) {
    const { address } = request.data;
    const result = await this.service.addressToCoordinates(address);
    return response.json(result);
  }

  async coordinatesToAddress(request, response) {
    const { lat, lon } = request.data;
    const result = await this.service.coordinatesToAddress(lat, lon);
    return response.json(result);
  }
}

const EnhancedGeocoderController = R.compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(GeocoderController);

export default new EnhancedGeocoderController(geocoder);
