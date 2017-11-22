import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const USERNAME = `testUsername${filename}`;
const PASSWORD = `testPassword${filename}`;
const WRONG_PASSWORD = `wrongTestPassword100${filename}`;
const userFields = { username: USERNAME, password: PASSWORD };
let user;
let userId;

async function clean() {
  await mockDB.cleanDB();
  userId = null;
}

async function createUser() {
  user = await mockDB.createUser(USERNAME, PASSWORD);
  userId = user._id.toString();
}

beforeAll(async () => mockDB.createDefaultUsers());

describe('Test the "/v1/authentication/login" path', () => {
  const route = '/v1/authentication/login';

  beforeEach(createUser);

  afterEach(clean);

  it('should login user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post(route, 200, userFields);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(id).toBe(userId);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not login user, because password is wrong', async () => {
    const result = await simulate.post(route, 401, {
      username: USERNAME,
      password: WRONG_PASSWORD
    });
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Password is wrong');
  });
});
