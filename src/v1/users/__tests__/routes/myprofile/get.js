import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/myprofile';

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
  beforeEach(createUser);
  afterEach(clean);

  it('should return own user profile', async () => {
    const { id, username: name, role } = await simulate.get(
      ROUTE,
      200,
      userToken
    );

    expect(id).toBe(user.id.toString());
    expect(name).toBe(user.username);
    expect(role).toBe(user.role);
  });

  it('should not return own user profile, because userToken is invalid', async () => {
    const { error } = await simulate.get(ROUTE, 401, invalidToken);

    expect(error).toMatchSnapshot();
  });
});
