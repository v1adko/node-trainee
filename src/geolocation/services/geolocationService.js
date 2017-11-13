const NodeGeocoder = require('node-geocoder');
const { nodeGeocoderOptions } = require('../config');

const coordinationsService = require('./coordinationsService');

const geocoder = NodeGeocoder(nodeGeocoderOptions);
class GeocoderService {
  constructor() {
    this.addressToCoordinations = address => geocoder
      .geocode(address)
      .then((result) => {
        if (result.length === 0) {
          throw new Error('Entered address does not have any matches');
        } else { return coordinationsService.mapCoordinations(result); }
      });

    this.coordinationsToAddress = (lat, lon) => geocoder
      .reverse({ lat, lon })
      .then(result => coordinationsService.mapCoordinations(result));
  }
}

module.exports = new GeocoderService();

