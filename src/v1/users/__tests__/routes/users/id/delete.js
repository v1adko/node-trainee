import simulate from '../../../../../../utils/tests/request-helper';
import jwtService from '../../../../../../services/jwt-service';
import User from '../../../../user-model';
import userDao from '../../../../user-dao';
import mockDB from '../../../../../test-helpers/mock-db';
import permissions from '../../../../../../constants/permissions';
import UserHelper from '../../../../../../utils/tests/test-user-fields';

const ROUTE = '/v1/users';

const {
  username, password, invalidUserId, invalidToken
} = UserHelper;
let user;
let userToken;
let adminToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUserAndAccessTokens() {
  const userActor = new User();
  const adminActor = new User();
  adminActor.role = permissions.ADMIN.value;
  userToken = jwtService.generateJwt(userActor);
  adminToken = jwtService.generateJwt(adminActor);
  user = await mockDB.createUser(username, password);
}

beforeAll(clean);

describe(`Test the ${ROUTE}/:id path`, () => {
  afterEach(clean);
  beforeEach(createUserAndAccessTokens);

  it('should delete user by id', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.delete(route, 200, {}, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);

    expect(message).toBe('User was deleted');
    expect(changedUser).toBe(null);
  });

  it('should not delete user, because user token is not valid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.delete(route, 401, {}, invalidToken);
    const { auth, message } = result.body;
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(auth).toBe(false);
    expect(message).toBe('Invalid token, please repeat authentication.');
  });

  it('should not delete user, because user token is not have enough permissions', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.delete(route, 403, {}, userToken);
    const { message } = result.body;
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(message).toBe('Access was denied. Not enough permissions.');
  });

  it('should not delete user, because user id is invalid', async () => {
    const route = `${ROUTE}/${invalidUserId}`;
    const result = await simulate.delete(route, 400, {}, adminToken);
    const { message } = result.body;
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(message).toBe('User id is invalid');
  });
});
