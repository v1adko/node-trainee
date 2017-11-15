import UserMongoose from './userShema';
import { passwordService } from '../../services';

class UserAdapterMongoose extends UserMongoose {
  constructor() {
    super();
    this.safeFields = ['_id', 'username'];
  }

  set password(password) {
    const user = this;
    const changedUser = passwordService.set(user, password);
    this.salt = changedUser.salt;
    this.hash = changedUser.hash;
  }
}

export default UserAdapterMongoose;
