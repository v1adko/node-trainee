import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/authentication/register';

const {
  username, password, shortUsername, shortPassword
} = UserFields;

async function clean() {
  await mockDB.cleanDB();
}

beforeAll(clean);
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE} path`, () => {
  afterEach(clean);

  it('should register new user and return authentication status, user id and valid token', async () => {
    const body = { username, password };
    const result = await simulate.post(ROUTE, 200, body);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken.id).toBe(id);
  });

  it.skip('should not register new user, because it already exist', async () => {
    // TODO: Fix it. Same... It should work...
    await mockDB.createUser(username, password);
    const body = { username, password };
    const result = await simulate.post(ROUTE, 405, body);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('User already exist');
  });

  it('should not register user, because password is missing', async () => {
    const body = { username };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not register user, because username is missing', async () => {
    const body = { password };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not register user, because username too short', async () => {
    const body = { usernahe: shortUsername, password };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not register user, because password too short', async () => {
    const body = { username, password: shortPassword };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });
});
