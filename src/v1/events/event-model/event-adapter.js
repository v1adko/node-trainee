import Event from './event-shema';

class EventAdapter extends Event {
  constructor() {
    super();
    this.id = this._id;
  }
}

export default EventAdapter;
