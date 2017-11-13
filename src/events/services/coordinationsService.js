
const { geocoder } = require('../../geolocation');

class CoordinationsService {
  constructor() {
    this.set = (object) => {
      if (!object.address) return Promise.resolve(object);

      const updatedObject = object;

      return geocoder.addressToCoordinations(object.address)
        .then((res) => {
          if (res.length === 1) {
            const [{ address, coordinations }] = res;
            updatedObject.setCoordionations(coordinations);
            updatedObject.address = address;
          } else if (res.length >= 1) {
            throw new Error('Too many matches found, please specify address.');
          }
          return updatedObject;
        });
    };
  }
}

module.exports = new CoordinationsService();

