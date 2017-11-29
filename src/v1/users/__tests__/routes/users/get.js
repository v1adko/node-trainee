import simulate from '../../../../../utils/tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';
import UserHelper from '../../../../../utils/tests/testUserFields';

const ROUTE = '/v1/users';

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
  afterAll(clean);
  beforeAll(createUser);

  it('should return all users in response on GET method', async () => {
    const result = await simulate.get(ROUTE, 200, userToken);
    const { body } = result;
    const users = await mockDB.getAll();
    expect(Object.keys(body).length).toBe(users.length);
  });

  it('should not return all users in response on GET method, because user token is not valid', async () => {
    const result = await simulate.get(ROUTE, 401, invalidToken);
    const { auth, message } = result.body;
    expect(auth).toBe(false);
    expect(message).toBe('Invalid token, please repeat authentication.');
  });
});
