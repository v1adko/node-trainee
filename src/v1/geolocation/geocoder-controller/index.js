<<<<<<< dfe9734298596d55a3a3d9c839f9fb8c28afd3a7
import { compose } from 'ramda';
=======
import R from 'ramda';
>>>>>>> Add composition of decorators and fix dispatcher
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

const EnhancedGeocoderController = compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(GeocoderController);

export default new EnhancedGeocoderController(geocoder);
