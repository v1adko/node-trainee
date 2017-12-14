import UserMongoose from './user-schema';
import { passwordService } from '../services';

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    this.id = this._id;
    this.safeFields = ['id', 'username', 'role'];
  }

  set password(password) {
    const { salt, hash } = passwordService.generateSaltAndHash(password);
    this.salt = salt;
    this.hash = hash;
  }
}

export default UserAdapterMongoose;
