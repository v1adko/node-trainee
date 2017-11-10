const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    required: true,
    default: false
  },
  address: String,
  coordinations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coordinations',
    required: false
  }
});

module.exports = mongoose.model('Event', EventSchema);
