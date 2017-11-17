import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    required: true,
    default: false
  },
  address: String,
  coordinates: {
    lat: {
      type: Number
    },
    lon: {
      type: Number
    }
  }
});

export default mongoose.model('Event', EventSchema);
