import userDao from '../user-dao';
import userFields from '../../../utils/tests-utils/test-user-fields';
import db from '../../../db';
import permissions from '../../../constants/permissions';

const role = permissions.ADMIN.value;
const { username, password } = userFields;
const clean = async () => {
  await userDao.Model.remove({});
};

beforeAll(db.connect);
afterAll(db.closeConnection);

describe('Test base dao for mongoose', async () => {
  afterEach(clean);

  it('shold add test object to database', async () => {
    const user = await userDao.create(username, password, role);

    expect(user.username).toBe(username);
    expect(user.role).toBe(role);
  });

  it('shold add test object to database, witout role', async () => {
    const user = await userDao.create(username, password);

    expect(user.username).toBe(username);
    expect(user.role).toBe(permissions.USER.value);
  });

  it('shold not add test object with same unique fields', async () => {
    await userDao.create(username, password);

    let duplicateError = null;
    try {
      await userDao.create(username, password);
    } catch (error) {
      duplicateError = error;
    }

    expect(duplicateError).toMatchSnapshot();
  });
});
