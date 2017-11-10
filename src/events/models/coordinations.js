const mongoose = require('mongoose');

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

module.exports = mongoose.model('Coordinations', CoordinationsSchema);
