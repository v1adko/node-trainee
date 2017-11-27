import { genSaltSync, hashSync } from 'bcryptjs';
import UserMongoose from './userShema';

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    Object.defineProperty(this, 'id', {
      value: this._id,
      enumerable: true,
      configurable: true
    });
    this.safeFields = ['id', 'username', 'role'];
    this.id = this._id;
  }

  set password(password) {
    this.salt = genSaltSync(10);
    this.hash = hashSync(password, this.salt);
  }
}

export default UserAdapterMongoose;
