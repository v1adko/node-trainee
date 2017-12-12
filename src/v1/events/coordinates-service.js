import { geocoder } from '../geolocation';
import { RequestValidationError } from '../../lib/errors';

class CoordinatesService {
  set = async (object) => {
    if (!object.address) return Promise.resolve(object);

    const updatedObject = object;

    const result = await geocoder.addressToCoordinates(object.address);

    if (result.length === 1) {
      const [{ address, coordinates }] = result;
      updatedObject.coordinates = coordinates;
      updatedObject.address = address;
    } else if (result.length >= 1) {
      throw new RequestValidationError(
        'Too many matches found. Please specify address.'
      );
    } else {
      throw new RequestValidationError(
        'Matches not found. Please specify address.'
      );
    }
    return updatedObject;
  };
}

export default new CoordinatesService();
