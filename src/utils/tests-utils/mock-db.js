import userDao from '../../v1/users/user-dao';
import userFields from './test-user-fields';
import permissions from '../../constants/permissions';
import db from '../../db';

const { getUsersFields } = userFields;

class MockDB {
  constructor(DAO) {
    this.DAO = DAO;
  }

  createDefaultUsers = (userCount = 3) => {
    const users = [];
    getUsersFields(userCount).forEach(async (element) => {
      const { username, password, role } = element;
      const user = await this.createUser(username, password, role);
      users.push(user);
    });
  };

  createUser = (username, password, role = permissions.USER.value) => {
    const createdUser = this.DAO.create(username, password, role);
    return createdUser;
  };

  getAll = () => {
    const users = this.DAO.getAll();
    return users;
  };

  cleanDB = async () => {
    await this.DAO.Model.remove();
  };

  closeConnection = db.closeConnection;
}

export default new MockDB(userDao);
