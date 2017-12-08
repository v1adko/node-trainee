import simulate from '../../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../../services/jwt-service';
import User from '../../../../user-model';
import userDao from '../../../../user-dao';
import mockDB from '../../../../../../utils/tests-utils/mock-db';
import permissions from '../../../../../../constants/permissions';
import UserFields from '../../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/users';

const {
  username, password, invalidUserId, invalidToken
} = UserFields;
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
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE}/:id path`, () => {
  afterEach(clean);
  beforeEach(createUserAndAccessTokens);

  it('should delete user by id', async () => {
    const route = `${ROUTE}/${user.id}`;
    const { status, message } = await simulate.delete(
      route,
      200,
      {},
      adminToken
    );
    const users = await userDao.getAll();

    expect(status).toBe(true);
    expect(message).toMatchSnapshot();
    expect(users).toEqual([]);
  });

  it('should not delete user, because user token is not valid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const { error } = await simulate.delete(route, 401, {}, invalidToken);
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(error).toMatchSnapshot();
  });

  it('should not delete user, because user token is not have enough permissions', async () => {
    const route = `${ROUTE}/${user.id}`;
    const { error } = await simulate.delete(route, 403, {}, userToken);
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(error).toMatchSnapshot();
  });

  it('should not delete user, because user id is invalid', async () => {
    const route = `${ROUTE}/${invalidUserId}`;
    const { error } = await simulate.delete(route, 400, {}, adminToken);
    const nonDelentedUser = await userDao.getById(user.id);

    expect(nonDelentedUser.id).toEqual(user.id);
    expect(error).toMatchSnapshot();
  });

  it('should not delete user, bacuse user does not exist', async () => {
    await user.remove(user.id);
    const route = `${ROUTE}/${user.id}`;
    const error = await simulate.delete(route, 200, {}, adminToken);
    console.log(error);
  });
});
