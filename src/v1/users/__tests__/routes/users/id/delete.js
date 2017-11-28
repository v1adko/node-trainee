import simulate from '../../../../../../utils/tests/requestHelper';
import jwtService from '../../../../../../services/jwtService';
import User from '../../../../models/user';
import userDao from '../../../../dao';
import mockDB from '../../../../testHelpers/mockDB';
import permissions from '../../../../../../constants/permissions';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/users';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const wrongUserId = `wrongUserId${filename}`;
const wrongToken = `wrongToken${filename}`;
let user;
let userToken;
let adminToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  const userActor = new User();
  const adminActor = new User();
  adminActor.role = permissions.ADMIN.value;
  userToken = jwtService.generateJwt(userActor);
  adminToken = jwtService.generateJwt(adminActor);
  user = await mockDB.createUser(username, password);
}

describe(`Test the ${ROUTE}/:id path`, () => {
  afterEach(clean);
  beforeEach(createUser);

  it('should delete user by id', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.delete(route, 200, {}, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);

    expect(message).toBe('User was deleted');
    expect(changedUser).toBe(null);
  });

  it('should not return user in response on GET method, because user token is not valid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.delete(route, 401, {}, wrongToken);
    const { auth, message } = result.body;
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(auth).toBe(false);
    expect(message).toBe('Invalid token, please repeat authentication.');
  });

  it('should not return user in response on GET method, because user token is not have enough permissions', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.delete(route, 403, {}, userToken);
    const { message } = result.body;
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(message).toBe('Access was denied. Not enough permissions.');
  });

  it('should not return user in response on GET method, because user id is wrong', async () => {
    const route = `${ROUTE}/${wrongUserId}`;
    const result = await simulate.delete(route, 400, {}, adminToken);
    const { message } = result.body;
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(message).toBe('User id is invalid');
  });
});