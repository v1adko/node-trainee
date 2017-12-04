import userDao from '../../v1/users/user-dao';
import userFields from './test-user-fields';
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

  createUser = (...args) => this.DAO.create(...args);

  getAll = () => {
    const users = this.DAO.getAll();
    return users;
  };

  cleanDB = async () => {
    await this.DAO.Model.remove();
  };

  wait = async (time) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
    return promise;
  };

  closeConnection = db.closeConnection;
}

export default new MockDB(userDao);
