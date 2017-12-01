import NodeGeocoder from 'node-geocoder';
import nodeGeocoderOptions from '../geocoder-options';

import coordinatesService from './coordinates-service';

const nodeGeocoder = NodeGeocoder(nodeGeocoderOptions);

class GeocoderService {
  constructor(geocoder) {
    this.geocoder = geocoder;
  }

  async addressToCoordinates(address) {
    try {
      const result = await this.geocoder.geocode(address);
      return coordinatesService.mapCoordinates(result);
    } catch (error) {
      return { error: error.name, message: error.message };
    }
  }

  async coordinatesToAddress(lat, lon) {
    try {
      const result = await this.geocoder.reverse({ lat, lon });
      return coordinatesService.mapCoordinates(result);
    } catch (error) {
      return { error: error.name, message: error.message };
    }
  }
}

export default new GeocoderService(nodeGeocoder);
