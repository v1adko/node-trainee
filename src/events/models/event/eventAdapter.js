const Event = require('./eventShema');
const Coordinarions = require('../coordinations');

class EventAdapter extends Event {
  setCoordionations(coordinations) {
    this.coordinations = new Coordinarions();
    ({ ...this.coordinations } = coordinations);
  }
}

module.exports = EventAdapter;
