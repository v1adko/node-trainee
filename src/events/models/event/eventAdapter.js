import Event from './eventShema';

class EventAdapter extends Event {
  setCoordinates(coordinates) {
    this.coordinates = coordinates;
  }
}

export default EventAdapter;
