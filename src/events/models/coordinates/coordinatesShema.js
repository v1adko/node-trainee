import mongoose from 'mongoose';

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

export default mongoose.model('Coordinates', CoordinatesSchema);
