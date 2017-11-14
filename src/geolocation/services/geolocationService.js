const NodeGeocoder = require('node-geocoder');
const { nodeGeocoderOptions } = require('../config');

const coordinatesService = require('./coordinatesService');

const geocoder = NodeGeocoder(nodeGeocoderOptions);
class GeocoderService {
  addressToCoordinates = address => geocoder
    .geocode(address)
    .then((result) => {
      if (result.length === 0) {
        throw new Error('Entered address does not have any matches');
      } else { return coordinatesService.mapCoordinates(result); }
    })

  coordinatesToAddress = (lat, lon) => geocoder
    .reverse({ lat, lon })
    .then(result => coordinatesService.mapCoordinates(result))
}

module.exports = new GeocoderService();

