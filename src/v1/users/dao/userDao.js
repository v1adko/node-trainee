import BaseDao from '../../../utils/baseDaoMongoose';
import User from '../models/user';

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
