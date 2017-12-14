import AtmMongoose from './atm-schema';

class AtmAdapterMongoose extends AtmMongoose {
  constructor() {
    super();
    this.id = this._id;
  }

  setData(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}

export default AtmAdapterMongoose;
