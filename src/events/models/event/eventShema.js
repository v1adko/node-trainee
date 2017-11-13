const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    required: true,
    default: false
  },
  address: String,
  coordinates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coordinates',
    required: false
  }
});

module.exports = mongoose.model('Event', EventSchema);
