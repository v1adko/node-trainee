import BaseDao from '../../utils/base-dao-mongoose';
import User from './user-model';

class UserDao extends BaseDao {
  create(username, password, role) {
    const user = new this.Model();
    if (!username || !password) {
      throw new Error('RequredUserFields');
    }
    user.username = username;
    user.password = password;
    if (role) {
      user.role = role;
    }
    return super.create(user);
  }
}

export default new UserDao(User);
