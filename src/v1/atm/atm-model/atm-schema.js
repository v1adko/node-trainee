import mongoose from 'mongoose';

const AtmSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  type: String,
  cityRU: String,
  cityUA: String,
  cityEN: String,
  fullAddressRu: String,
  fullAddressUa: String,
  fullAddressEn: String,
  placeRu: String,
  placeUa: String,
  latitude: Number,
  longitude: Number,
  tw: {
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String,
    hol: String
  }
});

export default mongoose.model('Atm', AtmSchema);
