import { genSaltSync, hashSync } from 'bcryptjs';
import UserMongoose from './userShema';

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    this.safeFields = ['id', 'username', 'role'];
    this.id = this._id;
  }

  set password(password) {
    this.salt = genSaltSync(10);
    this.hash = hashSync(password, this.salt);
  }
}

export default UserAdapterMongoose;
