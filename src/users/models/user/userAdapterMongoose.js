const UserMongoose = require('./userShema');
const { PasswordService } = require('../../services');

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    this.safeFields = ['_id', 'username'];
  }

  setFields(userFields) {
    const { username, password } = userFields;
    if (username) {
      this.username = username;
    }
    if (password) {
      const changedUser = PasswordService.set(this, password);
      this.salt = changedUser.salt;
      this.hesh = changedUser.hesh;
    }
  }
}

module.exports = UserAdapterMongoose;
