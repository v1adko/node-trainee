import simulate from '../../../../../utils/tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../../users/testHelpers/mockDB';
import UserHelper from '../../../../../utils/tests/testUserFields';

const ROUTE = '/v1/authentication/login';

const { username, password, wrongPassword } = new UserHelper(ROUTE);

let user;

async function clean() {
  await mockDB.cleanDB();
}

async function createUser() {
  user = await mockDB.createUser(username, password);
}

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

    expect(message).toBe('All fields required');
  });

  it('should not login user, because username is missing', async () => {
    const body = { password };
    const result = await simulate.post(ROUTE, 400, body);
    const { message } = result.body;

    expect(message).toBe('All fields required');
  });
});
