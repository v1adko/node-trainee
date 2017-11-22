import User from '../models/user';
import userDao from '../dao';
import userMocks from './userMocks';
import permissions from '../../../constants/permissions';

const { getUsersFields, user: userFields, admin: adminFields } = userMocks;

class MockDB {
  constructor(DAO) {
    this.DAO = DAO;
  }

  createDefaultUsers = async (userCount = 3) => {
    const users = [];
    getUsersFields(userCount).forEach(async (element) => {
      const { username, password, role } = element;
      const user = await this.createUser(username, password, role);
      users.push(user);
      await this.DAO.create(user);
    });
  };

  createDefaultUser = async () => {
    const { username, password, role } = userFields;
    const user = await this.createUser(username, password, role);
    return user;
  };

  createDefaultAdmin = async () => {
    const { username, password, role } = adminFields;
    const user = await this.createUser(username, password, role);
    return user;
  };

  createUser = async (username, password, role = permissions.USER.value) => {
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    const createdUser = await this.DAO.create(user);
    return createdUser;
  };

  getAll = async () => {
    const users = await this.DAO.getAll();
    return users;
  };

  cleanDB = async () => {
    const users = await this.DAO.getAll();

    await users.forEach(async (user) => {
      await this.DAO.deleteById(user._id);
    }, this);
  };
}

export default new MockDB(userDao);
