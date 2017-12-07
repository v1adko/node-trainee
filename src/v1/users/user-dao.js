import BaseDao from '../../lib/base-dao-mongoose';
import User from './user-model';
import { ResourceDuplicateError } from '../../lib/errors';

class UserDao extends BaseDao {
  async create(username, password, role) {
    const user = new this.Model();
    user.username = username;
    user.password = password;
    if (role) {
      user.role = role;
    }
    try {
      const userr = await super.create(user);
      return userr;
    } catch (error) {
      if (error.name === ResourceDuplicateError.name) {
        error.message += ' User already exist. Please input another username';
      }
      throw error;
    }
  }
}

export default new UserDao(User);
