import { geocoder } from '../geolocation';

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
      throw new Error('Too many matches found, please specify address.');
    } else {
      throw new Error('Matches not found, please specify address.');
    }
    return updatedObject;
  };
}

export default new CoordinatesService();
