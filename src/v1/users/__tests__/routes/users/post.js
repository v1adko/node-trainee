import simulate from '../../../../../utils/tests-utils/request-helper';
import User from '../../../user-model';
import jwtService from '../../../../services/jwt-service';
import permissions from '../../../../../constants/permissions';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserHelper from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/users';

const { username, password } = UserHelper;
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

describe(`Test the ${ROUTE} path`, () => {
  beforeEach(createAdminToken);
  afterEach(clean);

  it('should create user and return it in response on POST method', async () => {
    const result = await simulate.post(ROUTE, 200, body, adminToken);
    const { id, username: name } = result.body;

    expect(id).toEqual(expect.any(String));
    expect(name).toBe(username);
  });

  it('should not create user because user already exist', async () => {
    await mockDB.createUser(username, password);
    const result = await simulate.post(ROUTE, 405, body, adminToken);
    const { message } = result.body;

    expect(message).toBe('User already exist');
  });
});
