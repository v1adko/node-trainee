import simulate from '../../../../../utils/tests/request-helper';
import jwtService from '../../../../../services/jwt-service';
import mockDB from '../../../../test-helpers/mock-db';
import UserHelper from '../../../../../utils/tests/test-user-fields';

const ROUTE = '/v1/myprofile';

const { username, password, invalidToken } = UserHelper;
let user;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  user = await mockDB.createUser(username, password);
  userToken = jwtService.generateJwt(user);
}

beforeAll(async () => {
  await clean();
  mockDB.createDefaultUsers();
});

describe(`Test the ${ROUTE} path`, () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should return own user profile', async () => {
    const result = await simulate.get(ROUTE, 200, userToken);
    const { id, username: name, role } = result.body;

    expect(id).toBe(user.id.toString());
    expect(name).toBe(user.username);
    expect(role).toBe(user.role);
  });

  it('should not return own user profile, because userToken is invalid', async () => {
    const result = await simulate.get(ROUTE, 401, invalidToken);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Invalid token, please repeat authentication.');
  });
});
