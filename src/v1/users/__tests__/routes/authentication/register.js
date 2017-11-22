import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/authentication/register';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const body = { username, password };

async function clean() {
  await mockDB.cleanDB();
}

beforeAll(async () => mockDB.createDefaultUsers());

describe(`Test the ${ROUTE} path`, () => {
  afterAll(clean);

  it('should register new user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post(ROUTE, 200, body);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(id);
  });

  it('should not register new user, because it already exist', async () => {
    const result = await simulate.post(ROUTE, 400, body);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('User already exist');
  });
});