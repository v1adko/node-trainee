const mongoose = require('mongoose');
// const userMethods = require('../controllers/userModelCtrl');
const geo = require('../geolocation').geocoder;

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
      })
      .catch((err) => { throw err; });
  }
  return null;
};

mongoose.model('Event', EventSchema);
