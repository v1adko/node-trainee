import Event from './eventShema';
import Coordinates from '../coordinates';

class EventAdapter extends Event {
  setCoordinates(coordinates) {
    this.coordinates = new Coordinates();
    ({ ...this.coordinates } = coordinates);
  }
}

export default EventAdapter;
