import mongoose from 'mongoose';
import permissions from '../../../config/permissions';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: permissions.USER.role
  },
  hash: String,
  salt: String
});

export default mongoose.model('User', UserSchema);
