import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/authentication/login';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const wrongPassword = `wrongTestPassword${filename}`;
let user;
let userId;

async function clean() {
  await mockDB.cleanDB();
  userId = null;
}

async function createUser() {
  user = await mockDB.createUser(username, password);
  userId = user._id.toString();
}

describe(`Test the ${ROUTE}path`, () => {
  beforeEach(createUser);

  afterEach(clean);

  it('should login user and return authentication status, user id and valid token', async () => {
    const body = { username, password };
    const result = await simulate.post(ROUTE, 200, body);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(id).toBe(userId);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not login user, because password is wrong', async () => {
    const body = { username, password: wrongPassword };
    const result = await simulate.post(ROUTE, 401, body);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Password is wrong');
  });

  it('should not login user, because password is missing', async () => {
    const body = { username };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required');
  });

  it('should not login user, because username is missing', async () => {
    const body = { password };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required');
  });
});
