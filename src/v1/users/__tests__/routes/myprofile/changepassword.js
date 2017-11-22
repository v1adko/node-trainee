import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/myprofile/changepassword';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const newPassword = `newTestPassword100${filename}`;
const wrongPassword = `wrongTestPassword100${filename}`;
const wrongToken = `wrongToken${filename}`;
let user;
let userId;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userId = null;
  userToken = null;
}

async function createUser() {
  user = await mockDB.createUser(username, password);
  userId = user._id.toString();
  userToken = jwtService.generateJwt(user);
}

beforeAll(async () => mockDB.createDefaultUsers());

describe(`Test the ${ROUTE} path`, () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should change pass for user and return authentication status, valid token', async () => {
    const body = { password, newPassword };
    const result = await simulate.put(ROUTE, 200, body, userToken);
    const { auth, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not change pass for user, because password is wrong', async () => {
    const body = { password: wrongPassword, newPassword };
    const result = await simulate.put(ROUTE, 400, body, userToken);
    const { message } = result.body;

    expect(message).toBe('Password is wrong');
  });

  it('should not change pass for user, because tokken is wrong', async () => {
    const body = { password, newPassword };
    const result = await simulate.put(ROUTE, 500, body, wrongToken);
    const { message } = result.body;

    expect(message).toBe('Failed to authenticate token.');
  });
});