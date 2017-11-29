import simulate from '../../../../../../utils/tests/requestHelper';
import jwtService from '../../../../../../services/jwtService';
import User from '../../../../models/user';
import mockDB from '../../../../testHelpers/mockDB';
import UserFields from '../../../../../../utils/tests/testUserFields';

const ROUTE = '/v1/users';

const {
  username, password, invalidUserId, invalidToken
} = new UserFields(
  ROUTE
);

let user;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  const userActor = new User();
  userToken = jwtService.generateJwt(userActor);
  user = await mockDB.createUser(username, password);
}

beforeAll(async () => {
  await mockDB.createDefaultUsers();
});

describe(`Test the ${ROUTE}/:id path`, () => {
  afterAll(clean);
  beforeAll(createUser);

  it('should return user by id in response on GET method', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.get(route, 200, userToken);
    const { id, username: name, role } = result.body;

    expect(id).toBe(user.id.toString());
    expect(name).toBe(user.username);
    expect(role).toBe(user.role);
  });

  it('should not return user in response on GET method, because user token is not valid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const result = await simulate.get(route, 401, invalidToken);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Invalid token, please repeat authentication.');
  });

  it('should not return user in response on GET method, because user id is invalid', async () => {
    const route = `${ROUTE}/${invalidUserId}`;
    const result = await simulate.get(route, 400, userToken);
    const { message } = result.body;

    expect(message).toBe('User id is invalid');
  });
});
