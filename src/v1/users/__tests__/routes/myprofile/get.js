import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/myprofile';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const invalidToken = `invalidToken${filename}`;
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
  await mockDB.createDefaultUsers();
});

describe.skip(`Test the ${ROUTE} path`, () => {
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
    const result = await simulate.get(ROUTE, 500, invalidToken);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Failed to authenticate token.');
  });
});
