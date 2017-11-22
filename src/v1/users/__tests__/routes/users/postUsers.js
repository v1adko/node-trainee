import simulate from '../../../../../tests/requestHelper';
import User from '../../../models/user/';
import jwtService from '../../../../../services/jwtService';
import permissions from '../../../../../constants/permissions';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const USERNAME = `testUsername${filename}`;
const PASSWORD = `testPassword${filename}`;
const USER_COUNT = 3;
const userFields = { username: USERNAME, password: PASSWORD };
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

beforeAll(async () => mockDB.createDefaultUsers(USER_COUNT));

describe('Test the "/v1/users" path', () => {
  const route = '/v1/users';

  beforeEach(createAdminToken);

  afterEach(clean);

  it('should create user and return it in response on POST method', async () => {
    const result = await simulate.post(route, 200, userFields, adminToken);
    const { _id, username } = result.body;

    expect(_id).toEqual(expect.any(String));
    expect(username).toBe(USERNAME);
  });

  it('should not create user because user already exist', async () => {
    await mockDB.createUser(USERNAME, PASSWORD);
    const result = await simulate.post(route, 409, userFields, adminToken);

    const { message } = result.body;

    expect(message).toBe('User already exist');
  });
});
