import { geocoder } from '../geolocation';
import { NeedSpecifyAddressError } from '../../lib/errors';

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
      throw new NeedSpecifyAddressError('Too many matches found.');
    } else {
      throw new NeedSpecifyAddressError('Matches not found.');
    }
    return updatedObject;
  };
}

export default new CoordinatesService();
