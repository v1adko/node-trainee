
import { geocoder } from '../../geolocation';

class CoordinatesService {
  set = (object) => {
    if (!object.address) return Promise.resolve(object);

    const updatedObject = object;

    return geocoder.addressToCoordinates(object.address)
      .then((res) => {
        if (res.length === 1) {
          const [{ address, coordinates }] = res;
          updatedObject.setCoordinates(coordinates);
          updatedObject.address = address;
        } else if (res.length >= 1) {
          throw new Error('Too many matches found, please specify address.');
        }
        return updatedObject;
      });
  }
}

export default new CoordinatesService();

