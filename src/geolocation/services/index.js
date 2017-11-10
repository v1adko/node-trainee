const NodeGeocoder = require('node-geocoder');

const { nodeGeocoderOptions } = require('../config');

class GeocoderService {
  constructor(options) {
    this.geocoder = NodeGeocoder(options);
  }

  static mapCoordinations(responsResult) {
    return responsResult.map(item =>
      ({
        address: item.formattedAddress,
        coordinations: { lat: item.latitude, lon: item.longitude }
      }));
  }

  addressToCoordinations(address) {
    return this.geocoder
      .geocode(address)
      .then((result) => {
        if (result.length === 0) {
          throw new Error('Entered address does not have any matches');
        } else { return GeocoderService.mapCoordinations(result); }
      });
  }

  coordinationsToAddress(lat, lon) {
    return this.geocoder
      .reverse({ lat, lon })
      .then(result => GeocoderService.mapCoordinations(result))
      .catch((err) => { throw err; });
  }
}

module.exports = new GeocoderService(nodeGeocoderOptions);

