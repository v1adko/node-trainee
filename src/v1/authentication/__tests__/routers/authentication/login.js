import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/authentication/login';

const {
  username,
  password,
  wrongPassword,
  shortPassword,
  shortUsername
} = UserFields;

let user;

async function clean() {
  await mockDB.cleanDB();
}

async function createUser() {
  user = await mockDB.createUser(username, password);
}

beforeAll(clean);

describe(`Test the ${ROUTE} path`, () => {
  beforeEach(createUser);

  afterEach(clean);

  it('should login user and return authentication status, user id and valid token', async () => {
    const body = { username, password };
    const result = await simulate.post(ROUTE, 200, body);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(id).toBe(user.id);
    expect(decodedToken.id).toBe(user.id);
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

    expect(message).toBe('All fields required.');
  });

  it('should not login user, because username is missing', async () => {
    const body = { password };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not login user, because username too short', async () => {
    const body = { usernahe: shortUsername, password };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not login user, because password too short', async () => {
    const body = { username, password: shortPassword };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });
});
