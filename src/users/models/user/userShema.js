const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

module.exports = mongoose.model('User', UserSchema);
