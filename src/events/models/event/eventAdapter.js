const Event = require('./eventShema');
const Coordinates = require('../coordinates');

class EventAdapter extends Event {
  setCoordinates(coordinates) {
    this.coordinates = new Coordinates();
    ({ ...this.coordinates } = coordinates);
  }
}

module.exports = EventAdapter;
