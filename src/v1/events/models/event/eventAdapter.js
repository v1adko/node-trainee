import Event from './eventShema';

class EventAdapter extends Event {
  constructor() {
    super();
    Object.defineProperty(this, 'id', {
      value: this._id,
      enumerable: true,
      configurable: true
    });
  }
}

export default EventAdapter;
