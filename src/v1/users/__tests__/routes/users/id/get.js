import simulate from '../../../../../../tests/requestHelper';
import jwtService from '../../../../../../services/jwtService';
import User from '../../../../models/user';
import mockDB from '../../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/users';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const wrongUserId = `wrongUserId${filename}`;
const wrongToken = `wrongToken${filename}`;
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
    const result = await simulate.get(`${ROUTE}/${user._id}`, 200, userToken);
    const { _id, username: name, role } = result.body;

    expect(_id).toBe(user._id.toString());
    expect(name).toBe(user.username);
    expect(role).toBe(user.role);
  });

  it('should not return user in response on GET method, because user token is not valid', async () => {
    const result = await simulate.get(`${ROUTE}/${user._id}`, 500, wrongToken);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Failed to authenticate token.');
  });

  it('should not return user in response on GET method, because user id is wrong', async () => {
    const result = await simulate.get(
      `${ROUTE}/${wrongUserId}`,
      400,
      userToken
    );
    const { message } = result.body;

    expect(message).toBe('User id is invalid');
  });
});
