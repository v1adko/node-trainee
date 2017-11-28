import simulate from '../../../../../utils/tests/requestHelper';
import User from '../../../models/user/';
import jwtService from '../../../../../services/jwtService';
import permissions from '../../../../../constants/permissions';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/users';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
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
    const result = await simulate.post(ROUTE, 409, body, adminToken);
    const { message } = result.body;

    expect(message).toBe('User already exist');
  });
});
