import NodeGeocoder from 'node-geocoder';
import { nodeGeocoderOptions } from '../config';

import coordinatesService from './coordinatesService';

const geocoder = NodeGeocoder(nodeGeocoderOptions);

class GeocoderService {
  addressToCoordinates = address =>
    geocoder
      .geocode(address)
      .then(result => coordinatesService.mapCoordinates(result))
      .catch(error => ({ error: error.name, message: error.message }));

  coordinatesToAddress = (lat, lon) =>
    geocoder
      .reverse({ lat, lon })
      .then(result => coordinatesService.mapCoordinates(result))
      .catch(error => ({ error: error.name, message: error.message }));
}

export default new GeocoderService();
