import BaseDao from '../../../utils/baseDaoMongoose';
import User from '../models/user';

class UserDao extends BaseDao {
  create(username, password) {
    const user = new this.Model();
    user.username = username;
    user.password = password;
    return super.create(user);
  }
}

export default new UserDao(User);
