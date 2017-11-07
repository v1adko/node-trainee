const userMethods = require('./services');
const mongoose = require('mongoose');

const UserMongoose = mongoose.model('User');

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();

    const keys = Object.keys(userMethods);
    for (let i = 0; i < keys.length; i += 1) {
      this[keys[i]] = userMethods[keys[i]];
    }
  }
}

module.exports = UserAdapterMongoose;
