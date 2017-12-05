import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/users';

const { username, password, invalidToken } = UserFields;

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
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE} path`, () => {
  afterAll(clean);
  beforeAll(createUser);

  it('should return all users in response on GET method', async () => {
    const result = await simulate.get(ROUTE, 200, userToken);
    const users = await mockDB.getAll();
    expect(Object.keys(result).length).toBe(users.length);
  });

  it('should not return all users in response on GET method, because user token is not valid', async () => {
    const { auth, message } = await simulate.get(ROUTE, 401, invalidToken);
    expect(auth).toBe(false);
    expect(message).toMatchSnapshot();
  });
});
