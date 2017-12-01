import { genSaltSync, hashSync } from 'bcryptjs';
import UserMongoose from './user-schema';

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    this.id = this._id;
    this.safeFields = ['id', 'username', 'role'];
    this.id = this._id;
  }

  set password(password) {
    this.salt = genSaltSync(10);
    this.hash = hashSync(password, this.salt);
  }
}

export default UserAdapterMongoose;
