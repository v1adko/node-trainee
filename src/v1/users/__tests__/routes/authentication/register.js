import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const USERNAME = `testUsername${filename}`;
const PASSWORD = `testPassword${filename}`;
const userFields = { username: USERNAME, password: PASSWORD };

async function clean() {
  await mockDB.cleanDB();
}

beforeAll(async () => mockDB.createDefaultUsers());

describe('Test the "/v1/authentication/register" path', () => {
  const route = '/v1/authentication/register/';

  afterAll(clean);

  it('should register new user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post(route, 200, userFields);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(id);
  });

  it('should not register new user, because it already exist', async () => {
    const result = await simulate.post(route, 400, userFields);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('User already exist');
  });
});
