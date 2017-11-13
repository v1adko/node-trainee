const mongoose = require('mongoose');

const CoordinatesSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Coordinates', CoordinatesSchema);
