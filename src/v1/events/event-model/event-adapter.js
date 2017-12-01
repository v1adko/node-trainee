import Event from './event-schema';

class EventAdapter extends Event {
  constructor() {
    super();
    this.id = this._id;
  }
}

export default EventAdapter;
