import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const USERNAME = `testUsername${filename}`;
const PASSWORD = `testPassword${filename}`;
const WRONG_TOKEN = `wrongToken${filename}`;
const USER_COUNT = 3;
let user;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  user = await mockDB.createUser(USERNAME, PASSWORD);
  userToken = jwtService.generateJwt(user);
}

beforeAll(async () => mockDB.createDefaultUsers(USER_COUNT));

describe('Test the "/v1/users" path', () => {
  const route = '/v1/users';

  afterAll(clean);

  beforeAll(createUser);

  it('should return all users in response on GET method', async () => {
    const result = await simulate.get(route, 200, userToken);
    const { body } = result;
    const users = await mockDB.getAll();
    expect(Object.keys(body).length).toBe(users.length);
  });

  it('should not return all users in response on GET method, because user token is not valid', async () => {
    const result = await simulate.get(route, 500, WRONG_TOKEN);
    const { auth, message } = result.body;
    expect(auth).toBe(false);
    expect(message).toBe('Failed to authenticate token.');
  });
});
