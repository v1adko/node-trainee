const mongoose = require('mongoose');
const { geocoder: geo } = require('../geolocation');

const CoordinationsSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
});

const EventSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    required: true,
    default: false
  },
  address: String,
  coordinations: CoordinationsSchema
});

EventSchema.methods.setCoordinations = function setCoordinations() {
  if (this.address) {
    return geo.addressToCoordinations(this.address)
      .then((res) => {
        if (res.length === 1) {
          const [coordinations] = res;
          this.coordinations = coordinations;
        }
        return this;
      });
  }
  return null;
};

module.exports = mongoose.model('Event', EventSchema);
