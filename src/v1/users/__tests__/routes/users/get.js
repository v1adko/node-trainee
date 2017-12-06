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

async function createUsers() {
  user = await mockDB.createUser(username, password);
  userToken = jwtService.generateJwt(user);
  await mockDB.createDefaultUsers();
}

beforeAll(clean);
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE} path`, () => {
  afterEach(clean);
  beforeEach(createUsers);

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
