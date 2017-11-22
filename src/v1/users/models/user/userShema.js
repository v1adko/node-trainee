import mongoose from 'mongoose';
import permissions from '../../../../constants/permissions';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: permissions.USER.value
  },
  hash: String,
  salt: String
});

export default mongoose.model('User', UserSchema);
