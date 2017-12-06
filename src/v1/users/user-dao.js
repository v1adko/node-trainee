import BaseDao from '../../lib/base-dao-mongoose';
import User from './user-model';
import { ResourceDuplicateError } from '../../lib/errors';

class UserDao extends BaseDao {
  async create(username, password, role) {
    const user = new this.Model();
    if (!username || !password) {
      throw new Error('RequredUserFields');
    }
    user.username = username;
    user.password = password;
    if (role) {
      user.role = role;
    }
    try {
      const userr = await super.create(user);
      return userr;
    } catch (error) {
      if (error instanceof ResourceDuplicateError) {
        error.expandErrorMessage(
          'User already exist. Please input another username'
        );
      }
      throw error;
    }
  }
}

export default new UserDao(User);
