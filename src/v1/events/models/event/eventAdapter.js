import Event from './eventShema';

class EventAdapter extends Event {
  get id() {
    return this._id;
  }
}

export default EventAdapter;
