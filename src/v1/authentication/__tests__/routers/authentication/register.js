import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/authentication/register';

const { username, password } = UserFields;

async function clean() {
  await mockDB.cleanDB();
}

beforeAll(clean);

describe(`Test the ${ROUTE} path`, () => {
  afterAll(clean);

  it('should register new user and return authentication status, user id and valid token', async () => {
    const body = { username, password };
    const result = await simulate.post(ROUTE, 200, body);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken.id).toBe(id);
  });

  it('should not register new user, because it already exist', async () => {
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
});
