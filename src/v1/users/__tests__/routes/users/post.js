import simulate from '../../../../../utils/tests-utils/request-helper';
import User from '../../../user-model';
import jwtService from '../../../../services/jwt-service';
import permissions from '../../../../../constants/permissions';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserHelper from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/users';

const {
  username,
  password,
  shortUsername,
  longtPassword30,
  invalidRole
} = UserHelper;
const body = { username, password };
let adminToken;

async function clean() {
  await mockDB.cleanDB();
  adminToken = null;
}

async function createAdminToken() {
  const admin = new User();
  admin.role = permissions.ADMIN.value;
  adminToken = jwtService.generateJwt(admin);
}

beforeAll(clean);
afterAll(mockDB.closeConnection);

describe.skip(`Test the ${ROUTE} path`, () => {
  beforeEach(createAdminToken);
  afterEach(clean);

  it('should create user and return it in response on POST method', async () => {
    const { id, username: name } = await simulate.post(
      ROUTE,
      200,
      body,
      adminToken
    );

    expect(id).toEqual(expect.any(String));
    expect(name).toBe(username);
  });

  it.skip('should not create user because user already exist', async () => {
    // TODO: Fix it. It should work, but it not. And it create two users with same username. Why and how it do this?
    await mockDB.createUser(username, password);
    const { message } = await simulate.post(ROUTE, 405, body, adminToken);

    expect(message).toMatchSnapshot();
  });

  it('should not create user because username less than 6 symbols', async () => {
    const invalidBody = { username: shortUsername, password };
    const { message } = await simulate.post(
      ROUTE,
      400,
      invalidBody,
      adminToken
    );

    expect(message).toMatchSnapshot();
  });

  it('should not create user because password more than 30 symbols', async () => {
    const invalidBody = { username, password: longtPassword30 };
    const { message } = await simulate.post(
      ROUTE,
      400,
      invalidBody,
      adminToken
    );

    expect(message).toMatchSnapshot();
  });

  it('should not create user because role is invalid', async () => {
    const invalidBody = { username, password, role: invalidRole };
    const { message } = await simulate.post(
      ROUTE,
      400,
      invalidBody,
      adminToken
    );

    expect(message).toMatchSnapshot();
  });
});
