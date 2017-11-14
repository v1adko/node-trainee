import mongoose from 'mongoose';

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

export default mongoose.model('Event', EventSchema);
