const UserMongoose = require('./userShema');
const { JwtService, PasswordService, UserService } = require('./services/');
const permissionsConst = require('../../config/permissions');

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    this.jwt = new JwtService(this, permissionsConst);
    this.password = new PasswordService(this);
    this.do = new UserService(this);
  }
}

module.exports = UserAdapterMongoose;
