import userDao from '../dao';
import userFields from '../../../utils/tests/testUserFields';
import permissions from '../../../constants/permissions';

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
}

export default new MockDB(userDao);
